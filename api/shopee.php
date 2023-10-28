<?php 

add_action( 'rest_api_init', function () {
    register_rest_route( 'rb-blocks/v1', 'shopee', array(
        'methods' => 'GET',
        'callback' => 'rb_api_get_shopee_link_detail',
        'permission_callback' => "__return_true"
    ) );
} );

function getLastEffectiveUrl($url)
{
    // initialize cURL
    $curl = curl_init($url);
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER  => true,
        CURLOPT_FOLLOWLOCATION  => true,
    ));

    // execute the request
    $result = curl_exec($curl);

    // extract the target url
    $redirectUrl = curl_getinfo($curl, CURLINFO_EFFECTIVE_URL);
    curl_close($curl);

    return $redirectUrl;
}

function rb_api_get_shopee_link_detail(WP_REST_Request $request) {
    $parameters = $request->get_params();

    if ( !isset($parameters['link']) || !wp_http_validate_url($parameters['link']) ) {
        return new WP_REST_Response([
            'code' => 'invalid_url',
            'status' => 'fail'
        ]);
    }

    // $content_response = wp_remote_get($parameters['link']);
    $product_link = getLastEffectiveUrl($parameters['link']);

    if ( !$product_link ) {
        return new WP_REST_Response([
            'code' => 'invalid_url',
            'status' => 'fail'
        ]);
    }
    $product_data = [];

    $pattern1 = '/i\.(\d+)\.(\d+)/';
    $pattern2 = '/product\/(\d+)\/(\d+)/';

    if (preg_match($pattern1, $product_link, $matches) || preg_match($pattern2, $product_link, $matches)) {
        $shop_id = $matches[1];
        $item_id = $matches[2];
        $ratings_url = "https://shopee.vn/api/v2/item/get_ratings?filter=0&flag=1&itemid=$item_id&limit=20&offset=0&shopid=$shop_id&type=0";
       
        $product_info_url = "https://mall.shopee.vn/api/v4/pdp/cart_panel/get";

        $requestBody = wp_json_encode( [
            "item_id" => $item_id,
            "shop_id" => $shop_id,
            "quantity" => 1
        ], JSON_NUMERIC_CHECK);
        

        $response = wp_remote_post($product_info_url, [
            'body' => $requestBody,
            'headers'     => [
                'Content-Type' => 'application/json',
            ],
            'timeout'     => 60,
            'redirection' => 5,
            'blocking'    => true,
            'httpversion' => '1.0',
            'sslverify'   => false,
            'data_format' => 'body',
        ]);
        if ( !is_wp_error($response) ) {
            $productRequest = json_decode(wp_remote_retrieve_body( $response ));
            $images = [];
            $image_url = 'https://down-vn.img.susercontent.com/file/';
            if ( isset($productRequest->data->item->image) ) {
                $images[] = $image_url . $productRequest->data->item->image;
            }
            if( isset($productRequest->data->item->tier_variations) ) {
                foreach($productRequest->data->item->tier_variations as $var) {
                    foreach($var->options as $opt ) {
                        if ( isset($opt->image) && $opt->image ) {
                            $images[] = $image_url . $opt->image;
                        }
                    }
                }
            }
            $product_data['images'] = $images;
            if( isset($productRequest->data->item->tracking->name) ) {
                $product_data['name'] = sanitize_text_field($productRequest->data->item->tracking->name);
            }

        }

    }

    $response = new WP_REST_Response([
        'status' => 'success',
        'params' => [
            'short_link' =>  $parameters['link'],
            'product_link' => $product_link
        ],
        'data' => $product_data
    ]);

    return $response;
}