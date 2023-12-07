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
	SelectControl,
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { 
	useEffect, 
	useMemo,
	useState
} from '@wordpress/element';

import defaultTemplate from './template.json';

export const getTemplate = ({ image = 'http://placehold.it/80x100?text=img', url = '', message = 'Your message go here', variations = false}) => {
	let templateString = JSON.stringify(defaultTemplate);

	let title = message;
	if ( variations && variations.length > 0 ) {
		variations[0].options.forEach(item => {
			if ( !!item.selected ) {
				title +=	` (${item.name})`
			}
		})
	}	

	templateString = templateString
		.replaceAll('{{link}}', url)
		.replaceAll('{{message}}', title)
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
		<InnerBlocks template={getTemplate(attributes)} />
	)
});


const Edit = ({ clientId, attributes, setAttributes}) => {
	const { replaceInnerBlocks } = useDispatch( store );
	const [variation, selectVariation] = useState(attributes?.image)

	const updateBlockAttrs = async (attrs) => {
		const { url = false } = attrs
		if ( !!url && isURL(url) ) {
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
				if ( !!response?.data?.variations ) {
					attrs.variations = response?.data?.variations;
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
						{!!attributes.variations && attributes.variations.length > 0 && <SelectControl
								label={`Options ${attributes.variations[0].title}`}
								value={ variation }
								options={ attributes.variations[0].options.map(item => ({ label: item.name, value: item.image || false }))}
								onChange={ ( value ) => {
									if ( isURL(value) ) {
										selectVariation(value);	
										attributes.variations[0].options.map(item => {
											item.selected = item.image === value
											return item;
										})
										console.log(attributes.variations)
										updateBlockAttrs({ 
											image: value,
											variations: attributes.variations
										});
									}
									
								}}
								__nextHasNoMarginBottom
						/>}
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