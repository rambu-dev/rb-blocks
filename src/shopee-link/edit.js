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
import { isURL } from '@wordpress/url';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
 
import { 
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { 
	useEffect, 
	useMemo
} from '@wordpress/element';

import defaultTemplate from './template.json';

export const getTemplate = ({ image = 'http://placehold.it/80x100?text=img', url = '', message = 'Your message go here'}) => {
	let templateString = JSON.stringify(defaultTemplate);
	templateString = templateString
		.replaceAll('{{link}}', url)
		.replaceAll('{{message}}', message)
		.replaceAll('{{image}}', image);

	return JSON.parse(templateString);
}

const ChildBlocks = withSelect(( select, ownProps ) => {
	const blocks = select( 'core/block-editor' ).getBlocks( ownProps.clientId );
	let image = '';
	let message = '';
	const getBlockValue = (block, name, field) => {
		let value = false;
		block.innerBlocks.forEach(child => {
			if ( value ) return; // Skip
			if ( child.name === name ) {
				value = child.attributes[field];
			} else if ( !!child.innerBlocks && child.innerBlocks.length > 0 ) {
				value = getBlockValue(child, name, field)
			}
		})
		return value;
	}
	if ( blocks.length > 0 ) {
		// Just get innerBlock data
		image = getBlockValue(blocks[0], 'core/image', 'url');
		message = getBlockValue(blocks[0], 'core/navigation-link', 'label')
	}
	return {
		image,
		message
	};
} )(({ attributes, clientId, onChange, image, message }) => {
	
	useEffect(() => {
		if ( !image || !message ) return;
		if ( typeof onChange === 'function' && (image != attributes.image || message != attributes.message) ) {
			onChange({ image, message });
		}
	}, [image, message])

	return (
		<>
			<InnerBlocks template={getTemplate(attributes)} />
		</>
	)
});


const Edit = ({ clientId, attributes, setAttributes}) => {
	const { replaceInnerBlocks } = useDispatch( store );

	const updateBlockAttrs = async ({ url }) => {
		let attrs = {}
		if ( isURL(url) ) {
			const response = await fetch(
				window.wpApiSettings.root + 'rb-blocks/v1/shopee?link=' + url,
				{ headers: { 'X-WP-Nonce': wpApiSettings.nonce } }) 
				.then(data => data.json());
			if ( response.status === 'success' ) {
				if ( !!response?.data?.name ) {
					attrs.message = response.data.name;
				}
				if ( !!response?.data?.images ) {
					attrs.image = response?.data?.images[0];
				}
			}
			attrs.url = url;
		}

		// Rerender blocks
		!!window.timeoutRenderBlocks && clearTimeout(window.timeoutRenderBlocks);
		window.timeoutRenderBlocks = setTimeout(() => {
			setAttributes(attrs)
			replaceInnerBlocks(
				clientId, 
				createBlocksFromInnerBlocksTemplate(getTemplate({
					...attributes,
					...attrs
				}))
			);
			window.timeoutRenderBlocks = false;
		}, 1000);
	}
	const changeHandle = (newValue = '') => {
		updateBlockAttrs({ url: newValue });	
	}
	
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
					<ChildBlocks 
						clientId={clientId} 
						attributes={attributes} 
						onChange={( attrs ) => {
							setAttributes(attrs);
						}}
					/> }
		</>
	)
}

export default Edit;