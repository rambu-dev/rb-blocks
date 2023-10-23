<?php
/**
 * Plugin Name: RB Blocks
 * Description: Add some custom blocks to support my system
 * Author: rambu.dev
 * Author URI: rambu.dev
 * Version: 1.0.0
 * 
 * 
 */
defined( 'ABSPATH' ) || exit;

function rb_guternberg_blocks() {
    $plugins = [
        'hello-world',
        'product-shopee'
    ];
    foreach( $plugins as $plugin ) {
        register_block_type_from_metadata(
            plugin_dir_path(__FILE__) . 'build/' . $plugin,
            [
                'render_callback' => 'rb_' . str_replace('-','_',$plugin) . '_callback',
            ]
        );
    }
}
add_action( 'init', 'rb_guternberg_blocks' );


function rb_product_shopee_callback ($attributes, $content) {
    return "<p>Hello world</p>";
}