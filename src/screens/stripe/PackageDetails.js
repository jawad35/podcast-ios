import { View, Text, SafeAreaView, ScrollView, Button, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../components/podcast/HeaderTitle'
import CustomButtons from '../../components/Items/CustomButtons'
import { scale } from 'react-native-size-matters'
import { GetPackageName } from '../../components/Helper/GetPackageName'
import { useNavigation } from '@react-navigation/native'

const PackageDetails = ({ route }) => {
    const [Details, setDetails] = useState()
    const navigation = useNavigation();

    const Basic = {
        TopText: `Full registration on Android and iOS app 1 Podcast Category Suggestions feature Trending`,
        facebookLink: 'https://www.facebook.com/groups/849570469228088',
        tiktokLink: 'https://www.tiktok.com/@podcasttonight.com',
        twitterLink: 'https://twitter.com/Podcast_Tonight',
        discordYLink: 'https://www.youtube.com/channel/UCybAky1TbRnpYrfY',
        instaLink: 'https://instagram.com/podcasttonight?igshid=ZDc4ODBmNjlmNQ'
    }

    const Top10 = {
        TopText: `Our social media presence: TikTok 71.000+ Followers (10's of millions of video views) Facebook Community Group 50.000+ Members Email List 30.000+ Subscribers Youtube 400 Subscribers (1 million short views in last 30 days) Discord 50 Members Instagram Twitter Pinterest Socials: Facebook Group:`,
        facebookLink: 'https://www.facebook.com/groups/849570469228088',
        tiktokLink: 'https://www.tiktok.com/@podcasttonight.com',
        twitterLink: 'https://twitter.com/Podcast_Tonight',
        discordYLink: 'https://www.youtube.com/channel/UCybAky1TbRnpYrfY',
        instaLink: 'https://instagram.com/podcasttonight?igshid=ZDc4ODBmNjlmNQ',
        bottomText: 'FEATURED In TOP 10 Of 2024 Article For Your Niche FEATURED In TOP 10 Of 2024 Video For Your Niche Podcast Review 700/1000 Words Published On www.podcasttonight.com Discord Community Access Facebook Group Access. Self Promo 5x A Week Discord Hangout With Podcast Creators Facebook Group Access 50.000+ Members (3x a Week Promo))'
    }
    const Pro = {
        TopText: `Our social media presence: TikTok 71.000+ Followers (10's of millions of video views) Facebook Community Group 50.000+ Members Email List 30.000+ Subscribers Youtube 400 Subscribers (1 million short views in last 30 days) Discord 50 Members Instagram Twitter Pinterest Socials: Facebook Group:`,
        facebookLink: 'https://www.facebook.com/groups/849570469228088',
        tiktokLink: 'https://www.tiktok.com/@podcasttonight.com',
        twitterLink: 'https://twitter.com/Podcast_Tonight',
        discordYLink: 'https://www.youtube.com/channel/UCybAky1TbRnpYrfY',
        instaLink: 'https://instagram.com/podcasttonight?igshid=ZDc4ODBmNjlmNQ',
        bottomText: 'Podcast Review 700/1000 Words Published On www.podcasttonight.com Podcast Radio 3 Times Weekly Direct Link On Article To Your Podcast Featured In Top 3 Of A Top 10 Article In Your Niche (Drives More Traffic) Be Featured In Our Newsletter To 30.000+ Weekly TikTok Video To Our 76.000+ Followers Weekly YouTube Shorts Posted On Our Channel Social Media Posts On Insta/Twitter/Pinterest/FB For Every Latest Episode Linking To Your Podcast Discord Community Access Facebook Group Access. Self Promo 5x A Week'
    }
    useEffect(() => {
        if (route.params?.item?.Price === 19) {
            setDetails(Basic)
        }
        if (route.params?.item?.Price === 59) {
            setDetails(Top10)
        }
        if (route.params?.item?.Price === 99) {
            setDetails(Pro)
        }
    }, [])

    const openExternalLink = async (url) => {
        // Check if the device supports deep linking
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Open the external link
            await Linking.openURL(url);
        } else {
            console.error(`Don't know how to open URL: ${url}`);
        }
    };

    return (
        <SafeAreaView style={{ marginBottom: scale(70) }} className='bg-black'>
            <HeaderTitle title={"Package Details"} icon={true} />
            <ScrollView>
                <View >
                    <Text className='bg-brown_darker text-white_color text-center p-2 m-2 text-lg rounded-lg font-bold'>{route.params?.item?.name}</Text>
                    <View className='p-2 m-2'>
                        <Text className='p-2 bg-white_color text-black rounded-md'>{Details?.TopText}</Text>
                        <Text className='p-2 mt-2 font-bold text-lg text-white_color inline-block text-center rounded-md'>Social Links</Text>
                        <CustomButtons styling="my-2" color={'white_color'} textColor={'black'} onClick={() => openExternalLink(Details.facebookLink)} title={"Facebook"} />
                        <CustomButtons styling="my-2" color={'white_color'} textColor={'black'} onClick={() => openExternalLink(Details.tiktokLink)} title={"TikTok"} />
                        <CustomButtons styling="my-2" color={'white_color'} textColor={'black'} onClick={() => openExternalLink(Details.twitterLink)} title={"Twitter"} />
                        <CustomButtons styling="my-2" color={'white_color'} textColor={'black'} onClick={() => openExternalLink(Details.discordYLink)} title={"Discord YouTube"} />
                        <CustomButtons styling="my-2" color={'white_color'} textColor={'black'} onClick={() => openExternalLink(Details.instaLink)} title={"Instagram"} />
                        {
                            Details?.bottomText && <Text className='p-2 bg-white_color text-black rounded-md'>{Details?.bottomText}</Text>
                        }
                        <CustomButtons styling="my-2" color={'brown_darker'} textColor={'white_color'} onClick={() => navigation.navigate('Checkout', {price:route.params?.item?.Price})} title={"Subscribe"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PackageDetails