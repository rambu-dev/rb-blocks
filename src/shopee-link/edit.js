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

export const getTemplate = ({ image = '', link = '', message = ''}) => {
	let templateString = JSON.stringify(defaultTemplate);
	templateString = templateString
		.replaceAll('{{link}}', link)
		.replaceAll('{{message}}', message)
		.replaceAll('{{image}}', image);

	return JSON.parse(templateString);
}

const Edit = ({ image, message, clientId, attributes, setAttributes}) => {
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
	
	const template = useMemo(() => {
		setAttributes({
			image,
			message
		})
		return getTemplate({
			image: image || attributes.image || 'http://placehold.it/80x100?text=img',
			link: attributes.url,
			message: message || attributes.message || 'Your message go here'
		})
	}, [image, message, attributes.url, setAttributes]);
	
	
	useEffect(() => {
		window.timeoutRenderBlocks = setTimeout(() => {
			replaceInnerBlocks(clientId, createBlocksFromInnerBlocksTemplate(template));
			window.timeoutRenderBlocks = false;
		}, 1000)
		return () => !!window.timeoutRenderBlocks && clearTimeout(window.timeoutRenderBlocks );
	}, [clientId, template])


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
} )(Edit);