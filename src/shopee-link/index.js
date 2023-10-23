import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
// Register the block
registerBlockType(metadata, {
	edit: Edit,
	save: () => null // Nil becuz this is dynamic block
});