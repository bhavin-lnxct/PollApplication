import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, TouchableOpacity, View } from 'react-native'
import Header from '../../components/header/header'
import NotificationStyle from './NotificationStyle'
import { useUserData } from '../../redux/reducers/user-slice/userSlice'
import CustomText from '../../components/text/CustomText'
import colors from '../../theme/colors/colors'
import svg from '../../theme/svg/svg'
import { SvgXml } from 'react-native-svg'
import { API, graphqlOperation } from 'aws-amplify'
import { Query } from '../../network/Query'
import { useDispatch } from 'react-redux'
import { notificationAction, useNotificationData } from '../../redux/reducers/notificationSlice/notificationSlice'
import { ms } from 'react-native-size-matters'
import NotificationRow from './notificationRow'
import Loading from '../../components/loading/Loading'

const Notification = () => {

    const userData = useUserData();
    const dispatch = useDispatch();
    const FlatListRef = useRef();
    const notification = useNotificationData();
    const [refreshing, setRefreshing] = useState(false);
    const [footerLoading, setFooterLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [offset, setOffSet] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getInitNotification()
    },[])

    const onRefreshFlatlist = () => {
        setOffSet(0);
        getInitNotification();
    }

    const getMoreNotification = async () => {
        if (notification.length <= 1) {
            return;
        }
        setFooterLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(Query.getNotifications,{user_id: userData?.user_id,offset:offset}));
            
            if (!result?.data?.getNotification) {
                setFooterLoading(false);
                return;
            }
            dispatch(
                notificationAction.setNotificationData([...notification, ...result?.data?.getNotification]),
            );
            setFooterLoading(false);
            setOffSet(val => val + 15);
        }    
        catch (error) {
            setFooterLoading(false);
            console.log(error,'error from get more notification');
        }
    }

    const getInitNotification = async () => {
        setLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(Query.getNotifications,{user_id: userData?.user_id,offset:0}));
            dispatch(notificationAction.setNotificationData(result?.data?.getNotification))
            setLoading(false);
            setRefreshing(false);
            setOffSet(val => val + 15);
        } catch (error) {
            setLoading(false);
            setRefreshing(false);
            console.log(error,'error from get init notification');
        }
    }

    const onPressClearAll = async () => {
        try {
            dispatch(notificationAction.deleteAllNotification())
            const result = await API.graphql(graphqlOperation(Query.deleteAllNotification,{user_id: userData?.user_id}));
            
        } catch (error) {
            setRefreshing(false);
            console.log(error,'error from delete single notification');
        }
    }

    const renderFooterComponent = () => {
        if (footerLoading) {
          return (
            <View style={NotificationStyle.bottomIcon}>
              <ActivityIndicator size="large" color={colors.AppTheme.Primary} />
            </View>
          );
        }
        return null;
    };
   
    return (
        
        <SafeAreaView style={{flex:1}}>
            <Header title="Notification" isBack={true} />
            {loading ? (
                <Loading Size={'large'} Color={colors.AppTheme.Primary} />
            ) : notification.length === 0 ? (
                <View style={NotificationStyle.noNotificationContainer}>
                    <SvgXml xml={svg.noNotification}/>
                </View>
            ) : (
                <>
                <TouchableOpacity onPress={onPressClearAll}>
                    <CustomText textStyle={NotificationStyle.clearAll}>Clear All</CustomText>
                </TouchableOpacity>
                <FlatList
                    data={notification}
                    ref={FlatListRef}
                    renderItem={({item,index})=>(<NotificationRow item={item} index={index}/>)}
                    keyExtractor={item => item.notification_id}
                    showsVerticalScrollIndicator={false}
                    disableVirtualization={true}
                    keyboardShouldPersistTaps="always"
                    scrollEventThrottle={16}
                    contentContainerStyle={{paddingHorizontal:ms(16),paddingBottom:ms(120)}}
                    onEndReached={() => {
                        if (!endReached ) {
                            getMoreNotification();
                            setEndReached(true);
                        }
                    }}
                    onMomentumScrollBegin={() => setEndReached(false)}
                    scrollEnabled={true}
                    refreshControl={
                        <RefreshControl
                          colors={['#003C71', 'blue']}
                          refreshing={refreshing}
                          onRefresh={onRefreshFlatlist}
                        />
                    }
                    ListFooterComponent={renderFooterComponent}
                />
                </>
            )
            }
        </SafeAreaView>
    )
};

export default Notification;
