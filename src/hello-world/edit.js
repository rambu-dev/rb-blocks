import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph' ];
const MY_TEMPLATE = [
    [ 'core/image', {} ]
    [ 'core/paragraph', {} ]
];
const Edit = () => {
	return (
		<div>
			Hello World
		</div>
	)
}

export default Edit;