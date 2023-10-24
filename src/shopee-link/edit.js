import {
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	SelectControl,
	PanelBody,
} from '@wordpress/components';

import { 
	InnerBlocks, 
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import { 
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

import defaultTemplate from './template.json';

export const getTemplate = ({ image = '', link = '', message = ''}) => {
	let templateString = JSON.stringify(defaultTemplate);
	templateString = templateString
		.replaceAll('{{link}}', link)
		.replaceAll('{{message}}', message)
		.replaceAll('{{image}}', image);

	return JSON.parse(templateString);
}

const CustomBlocks = ({ template }) => {
	console.log('rerender');
	return (
		<InnerBlocks template={template} />
	)
}

const Edit = ({ attributes, setAttributes}) => {
  const [value, setValue] = useState( attributes.url || '' );


	const changeHandle = (newValue = '') => {
		setValue(newValue || '');
		setAttributes({ url : newValue });
	}
	
	const template = getTemplate({
		image: "http://placehold.it/80x120?text=img",
		link: value,
		message: "hello world"
	});

	return (
		<>
				<InspectorControls>
					<PanelBody title={ 'Settings' }>
						<InputControl
							label={"Product Link"}
							value={ value }
							onChange={changeHandle}
						/>
					</PanelBody>
					
				</InspectorControls>
				{!!value && 
					<CustomBlocks template={template} />
				}
		</>
	)
}

export default Edit;