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

require_once plugin_dir_path(__FILE__) . 'api/shopee.php';

function rb_guternberg_blocks() {
    $plugin_dir_path = plugin_dir_path(__FILE__);
    $plugins = [
        'hello-world',
        'shopee-link'
    ];
    foreach( $plugins as $plugin ) {
        register_block_type_from_metadata(
            plugin_dir_path(__FILE__) . 'build/' . $plugin,
            [
                'render_callback' => function ($attributes, $content, $block) use ($plugin_dir_path, $plugin) {
                    $template = $plugin_dir_path . 'src/' . $plugin . '/template.php';
                    if( file_exists($template) )  {
                        ob_start();
                        load_template($template, false, $attributes);
                        $html = ob_get_contents();
                        ob_end_clean();
                        
                        return do_blocks($html);
                    }
                },
            ]
        );
    }
}
add_action( 'init', 'rb_guternberg_blocks' );
