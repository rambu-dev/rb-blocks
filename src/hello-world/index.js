/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
// Register the block
registerBlockType(metadata, {
	edit: Edit
});