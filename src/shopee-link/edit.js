import {
	PanelBody,
} from '@wordpress/components';
import { 
	withSelect,
	useDispatch 
} from '@wordpress/data';

import { 
	InnerBlocks, 
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store
} from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
 
import { 
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';

import defaultTemplate from './template.json';

export const getTemplate = ({ image = '', link = '', message = ''}) => {
	let templateString = JSON.stringify(defaultTemplate);
	templateString = templateString
		.replaceAll('{{link}}', link)
		.replaceAll('{{message}}', message)
		.replaceAll('{{image}}', image);

	return JSON.parse(templateString);
}

const Edit = ({ image, clientId, attributes, setAttributes}) => {
	const { replaceInnerBlocks } = useDispatch( store );
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps)

	const updateBlockAttrs = ({ url }) => {
		let link = '';
		var isValid = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
		if ( !!url && isValid !== null ) {
			link = url;
		}
		setAttributes({ url: link });
	}
	const changeHandle = (newValue = '') => {
		if ( !!window.updateBlockTimeout ) clearTimeout(window.updateBlockTimeout)
		window.updateBlockTimeout = setTimeout(() => {
			updateBlockAttrs({ url: newValue });
			window.updateBlockTimeout = false;
		}, 600);
	}

	const product_image = useMemo(() => image || attributes.image || 'http://placehold.it/80x100?text=img', [image, attributes.image])

	useEffect(() => {
		setAttributes({ image: image });
		const template = getTemplate({
			image: product_image,
			link: attributes.url,
			message: attributes.message || 'Your message go here'
		});
		replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(template));
	}, [attributes.url, setAttributes, product_image])

	return (
		<>
				<InspectorControls>
					<PanelBody title={ 'Settings' }>
						<InputControl
							label={"Product Link"}
							value={attributes.url}
							onChange={changeHandle}
						/>
					</PanelBody>
					
				</InspectorControls>
				{!!attributes.url && 
					<div {...blockProps}>
						<div {...innerBlocksProps} />
					</div>	
				}
		</>
	)
}

export default withSelect( ( select, blockData ) => {
	const blocks = select( 'core/block-editor' ).getBlocks( blockData.clientId );
	let image = '';
	if ( blocks.length > 0 ) {
		// Just get innerBlock data
		blocks[0].innerBlocks.forEach(block => {
			if ( block.name === 'core/image') {
				image = block.attributes.url
			}
		})
	}
	return {
		image: image
	};
} )(Edit);