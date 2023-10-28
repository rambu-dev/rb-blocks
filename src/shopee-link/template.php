<!-- wp:group {"allowedBlocks":["core/image","core/group","core/button","core/buttons","core/navigation-link"],"lock":"all","style":{"spacing":{"padding":{"top":"12px","bottom":"12px","left":"12px","right":"12px"},"blockGap":"12px"},"border":{"radius":"12px"},"alignItems":"stretch"},"backgroundColor":"base","layout":{"type":"flex","verticalAlignment":"stretch","allowSizingOnChildren":true, "flexWrap":"nowrap"}} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:12px;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px"><!-- wp:image {"width":"80px","aspectRatio":"0.75","scale":"cover","style":{"border":{"radius":"12px"}}} -->
<figure class="wp-block-image is-resized has-custom-border"><a  href="<?php echo $args['url'] ?>" target="_blank" rel="noreferrer"><img src="<?php echo $args['image'] ?>" alt="" style="border-radius:12px;aspect-ratio:0.75;object-fit:cover;width:80px"/></a></figure>
<!-- /wp:image -->

<!-- wp:group {"style":{"layout":{"selfStretch":"fill"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"stretch","flexWrap":"wrap","allowSizingOnChildren":true,"verticalAlignment":"space-between"}} -->
<div class="wp-block-group">
    <!-- wp:paragraph {"align":"left"} -->
        <p class="has-text-align-left">
            <a href="<?php echo $args['url'] ?>" target="_blank" rel="noreferrer"><?php echo isset($args['message']) ? $args['message'] : 'Your message go here'; ?></a>
            <?php if ( isset($args['variations']) && count($args['variations']) > 0 ) : ?>
                <?php foreach( $args['variations'][0]['options'] as $var ) : ?>
                    <?php if ( isset($var['selected']) && $var['selected'] ): ?>
                        <br><span style="font-size: 0.85em"><?php echo '(' . $var['name'] . ')'; ?></span>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </p>
    <!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"right"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"4px"}},"fontSize":"small"} -->
<div class="wp-block-button has-custom-font-size has-small-font-size"><a class="wp-block-button__link wp-element-button" href="<?php echo $args['url'] ?>" target="_blank" rel="noreferrer" style="border-radius:4px">xem</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->