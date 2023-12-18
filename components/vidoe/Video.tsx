/** @format */

import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	Text,
	TouchableOpacity,
	Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResizeMode, Video } from 'expo-av';
import * as Sharing from 'expo-sharing';

const VideoList = ({modalVisible}:any) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		loadVideos();
	}, [modalVisible]);

	const loadVideos = async () => {
		try {
			// Retrieve video links from AsyncStorage
			const storedVideos = await AsyncStorage.getItem(
				'videoUri',
			);

			if (storedVideos) {
				const parsedVideos = JSON.parse(storedVideos);
				setVideos(parsedVideos);
				console.log(storedVideos);
			}
		} catch (error) {
			console.error('Error loading videos:', error);
		}
	};

	const playVideo = async (videoUri: any) => {
		console.log('Playing video:', videoUri);
	};


    

	const renderItem = ({ item }: any) => (
		<View>
			<TouchableOpacity
				className=''
				onPress={() => playVideo(item.uri)}>
				<Video
					source={{ uri: item.uri }}
					style={{ height: 320 }}
					className='rounded-md bg-gray-100  w-full'
					resizeMode={ResizeMode.COVER}
					useNativeControls
				/>
			</TouchableOpacity>
			<View className='flex-row mt-3 justify-between'>
				<TouchableOpacity
					onPress={() =>{ AsyncStorage.removeItem("videoUri")
                       setVideos([])
                    }}>
					<Image
						source={require('../../assets/images/rash.png')}
						className='h-6 object-contain w-6'
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => Sharing.shareAsync(item.uri)}>
					<Image
						source={require('../../assets/images/share.png')}
						className='h-8 object-contain w-8'
					/>
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<View>
			<FlatList
				data={videos}
				keyExtractor={(item) => item}
				renderItem={renderItem}
			/>
		</View>
	);
};

export default VideoList;
