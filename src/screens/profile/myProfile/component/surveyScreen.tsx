import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, View } from "react-native";
import { ms } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import SurveyCard from "../../../../components/card/surveyCard";
import Loading from "../../../../components/loading/Loading";
import appConstants from "../../../../helper/appConstant";
import { showToast } from "../../../../helper/helper";
import messages from "../../../../helper/messages";
import { Query } from "../../../../network/Query";
import { feedSliceActions, useMyFeedData, UseMySurveyData } from "../../../../redux/reducers/feedSlice/feedSlice";
import { useUserData } from "../../../../redux/reducers/user-slice/userSlice";
import colors from "../../../../theme/colors/colors";

const ProfileSurveyScreen = (userId: string) => {

    const dispatch = useDispatch();
    const userData = useUserData();
    const mySurveys = UseMySurveyData();
    const [offset, setOffset] = useState(0);
    const [feedLoading, setFeedLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [footerLoading, setFooterLoading] = useState(false);
    const [endReached, setEndReached] = useState(false);

    useEffect(()=>{
        setOffset(0);
        getMyInitSurvey()
    },[])

    const getMyInitSurvey = async () => {
        setFeedLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(Query.getUserSurvey,{user_id: userId?.userId,my_id: userData?.user_id,offset: 0}));
            dispatch(feedSliceActions.setFeedDataAction({collectionName: 'mySurveys',data: result?.data?.getUserSurvey}));
            setOffset(val => val + 10);
            setRefreshing(false);
            setFeedLoading(false);
        } catch (error) {
            console.log(error?.errors[0]?.message);
            setRefreshing(false);
            setFeedLoading(false);
            showToast(messages.somethingWentWrong);
        }
    }

    const getMoreMySurveys = async () => {
        if (mySurveys.length <= 1) return;
        setFooterLoading(true);
        try {
            const result = await API.graphql(graphqlOperation(Query.getUserSurvey,{user_id: userId?.userId,my_id: userData?.user_id,offset: offset}));
            if (result?.data?.getUserSurvey === []) {
                setFooterLoading(false);
                return;
            }
            dispatch(feedSliceActions.setFeedDataAction({collectionName: 'mySurveys',data: [...mySurveys, ...result?.data?.getUserSurvey]}));
            setFooterLoading(false);
            setOffset(val => val + 10);
        } catch (error) {
            console.log(error?.errors[0]?.message);
            setFooterLoading(false);
        }
    }

    const onRefreshFlatlist = () => {
        setRefreshing(true);
        setOffset(0);
        getMoreMySurveys();
    };

    const renderFooterComponent = () => {
        if (footerLoading) {
          return (
            <View style={{width: '100%', marginVertical: 10, marginBottom: ms(80)}}>
              <ActivityIndicator size="large" color={colors.AppTheme.Primary} />
            </View>
          );
        }
        return null;
    };
    
    return(
        <SafeAreaView>
        {feedLoading ? (
            <Loading Size={'large'} Color={colors.AppTheme.Primary} />
            ) : (
            <FlatList
                data={mySurveys}
                renderItem={({item, index}) => (
                <SurveyCard
                    item={item}
                    index={index}
                    routeName={appConstants.mySurveys}
                />)}
                keyExtractor={item => item.survey_id}
                ItemSeparatorComponent={() => <View style={{margin: ms(4)}} />}
                showsVerticalScrollIndicator={false}
                disableVirtualization={true}
                keyboardShouldPersistTaps="always"
                scrollEventThrottle={16}
                maxToRenderPerBatch={5}
                windowSize={50}
                onEndReached={() => {
                if (!endReached) {
                    getMoreMySurveys();
                    setEndReached(true);
                }
                }}
                onEndReachedThreshold={1}
                onMomentumScrollBegin={() => setEndReached(false)}
                scrollEnabled={true}
                style={{marginBottom: ms(0)}}
                contentContainerStyle={{paddingBottom: 80}}
                refreshControl={
                <RefreshControl
                    colors={['#003C71', 'blue']}
                    refreshing={refreshing}
                    onRefresh={onRefreshFlatlist}
                />
                }
                ListFooterComponent={renderFooterComponent}
            />
            )}
        </SafeAreaView>
    )
}

export default ProfileSurveyScreen;