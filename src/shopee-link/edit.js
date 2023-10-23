import { Button } from '@wordpress/components';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { 
	__experimentalInputControl as InputControl,
	__experimentalVStack as VStack,
	__experimentalHStack as HStack,
	__experimentalText as Text,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const Edit = ({ attributes, setAttributes}) => {
  const [value, setValue] = useState( attributes.url || '' );

	const changeHandle = (newValue = '') => {
		setValue(newValue || '');
		setAttributes({ url : newValue });
	}

	return (
		<div>
        <InputControl
					value={ value }
					onChange={changeHandle}
        />
        {!!value && 
					<InnerBlocks orientation="horizontal" template={[
						['core/group', {
							layout: { type: 'flex', flexWrap: 'nowrap' }
						}, [
							['core/image' , {
								url: 'http://placehold.it/80x100?text=hello',
								width: '80px',
								href: value,
								linkTarget: "_blank",
								rel: "noreferrer"
							}],
							['core/group', {
								layout: { type: 'flex', orientation: 'vertical' }
							}, [
								['core/paragraph', { 
									content: "<a href='"+value+"'>Hello world</a>", 
									align: 'left' 
								}],
								['core/button', { 
									text: 'xem',
									url: value
								}]
							]]
						]]
					]} />	
				}
		</div>
	)
}

export default Edit;