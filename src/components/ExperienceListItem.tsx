import { View, Text, Image } from 'react-native';
import React from 'react';
import { Experience } from '@/types';

type ExperienceListItemProps = {
	experience: Experience;
};

const ExperienceListItem = ({ experience }: ExperienceListItemProps) => {
	return (
		<View className='flex flex-row p-2 items-center border-b-2 border-gray-100'>
			<Image source={{ uri: experience.companyImage }} alt='pic' className='w-20 h-20' />
			<Text>{experience.companyName}</Text>
		</View>
	);
};

export default ExperienceListItem;
