<!-- wp:group {"lock":"all","style":{"spacing":{"padding":{"top":"12px","bottom":"12px","left":"12px","right":"12px"},"blockGap":"12px"},"border":{"radius":"12px"}},"backgroundColor":"var(--wc-green)","layout":{"type":"flex","allowSizingOnChildren":true}} -->
<div class="wp-block-group has-base-background-color" style="border-radius:12px;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px">
    <!-- wp:image {"width":"80px","height":"auto","aspectRatio":"0.75","scale":"cover","style":{"border":{"radius":"12px"}}} -->
    <figure class="wp-block-image is-resized has-custom-border">
        <a href="<?php echo $args['url']; ?>" target="_blank" rel="noreferrer">
            <img src="<?php echo $args['image'] ?>" alt="" style="border-radius:12px;aspect-ratio:0.75;object-fit:cover;width:80px;height:auto"/>
        </a>
    </figure> <!-- /wp:image -->

    <!-- wp:group {"style":{"layout":{"selfStretch":"fill"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap","allowSizingOnChildren":true}} -->
    <div class="wp-block-group">
        <!-- wp:paragraph {"align":"left"} -->
        <p class="has-text-align-left"><a href="<?php echo $args['url'] ?>" target="_blank" rel="noreferrer"><?php echo isset($args['message']) ? $args['message'] : 'Your message go here'; ?></a></p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
        <div class="wp-block-buttons">
            <!-- wp:button {"style":{"border":{"radius":"4px"}},"fontSize":"small"} -->
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button" href="<?php echo $args['url']; ?>" target="_blank" rel="noreferrer">xem</a>
            </div> <!-- /wp:button -->
        </div> <!-- /wp:buttons -->
    </div> <!-- /wp:group -->
</div> <!-- /wp:group -->