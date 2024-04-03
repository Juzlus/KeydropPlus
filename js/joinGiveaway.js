let giveawayInterval = null;
const refreshGiveawayTime =  45 * 1000;

const giveawayStart = async(isFirst) => {
    const config = await getConfigData();
    let gConfig = await getAutoGiveawayConfigData();

    if(!gConfig?.active || !config?.active || !config?.token) return;
    const server = await getServerData();
    const language = await getLanguageData(config?.lang);
    const port = server?.keydropGiveawaysPort || 2061;

    if(isFirst) createToast('info', 'autogiveaway_active');
    const index = await getIndexData();
    const currencyRates = index?.currencyRates;
    const currency = getCookieValue('currency');
    const currentRate = currencyRates?.filter(el => el?.id == currency)[0]?.rate || 1;
    runAutoGiveaway(language, port, currentRate, isFirst);
};

const runAutoGiveaway = async(language, port, currentRate, isFirst) => {
    const config = await getConfigData();
    let gConfig = await getAutoGiveawayConfigData();
    if(!config || !config?.active || !gConfig?.active) return;

    if(gConfig?.currentGiveaway?.id)
        gConfig = await getGiveawayData(language, gConfig, port, config?.token);

    if(gConfig?.currentGiveaway?.deadlineTimestamp <= new Date().getTime())
        gConfig = await findNewGiveaway(gConfig, port, config?.token);

    if(!gConfig?.currentGiveaway?.haveIJoined && !gConfig?.currentGiveaway.captcha && gConfig?.currentGiveaway?.id && gConfig.currentGiveaway.maxPrice * currentRate >= parseFloat(gConfig?.minPrice))
        gConfig = await joinGiveaway(language, gConfig, config?.token);
    else if(gConfig?.currentGiveaway?.id && gConfig?.currentGiveaway?.captcha && isFirst)
        createToast('error', null, `(ID: ${gConfig?.currentGiveaway?.id})`, `https://key-drop.com/giveaways/keydrop/${gConfig?.currentGiveaway?.id}`, `${language?.autogiveaway_error} ${language?.autogiveaway_captcha}`);

    //const waitingTime = (autoGiveawayConfig?.currentGiveaway?.deadlineTimestamp - new Date().getTime()) + Math.floor(Math.random() * 60000) + 60000;
    setTimeout(async() => {
        return runAutoGiveaway(language, port, currentRate);
    }, refreshGiveawayTime);// waitingTime > 0 ? waitingTime : (15 * 60 * 1000));
};

const getGiveawayData = async(language, gConfig, port, token) => {
    const fetch = await fetchUrl('GET', `https://wss-${port || 2061}.key-drop.com/v1/giveaway//data/${gConfig?.currentGiveaway?.id}`, token);
    if(!fetch || !fetch?.data) return;
    const data = fetch?.data;

    if(data?.status !== 'ended')
        return gConfig;

    const giveaway = {
        id: data?.id,
        deadlineTimestamp: data?.deadlineTimestamp,
        frequency: data?.frequency,
        haveIJoined: data?.haveIJoined,
        mySlot: data?.mySlot,
        Iwined: false,
        captcha: gConfig?.currentGiveaway?.captcha,
        publicHash: data?.publicHash,
        prizes: data?.prizes,
        winners: data?.winners,
    }

    if(data?.winners?.find(winner => data?.mySteamId == winner?.userdata?.idSteam)) {
        giveaway.Iwined = true;
        createNotifications(language?.autogiveaway_win, `https://key-drop.com/giveaways/keydrop/${data?.id}`);
    }

    gConfig.currentGiveaway.id = null;
    gConfig.currentGiveaway.deadlineTimestamp = null;
    gConfig.currentGiveaway.haveIJoined = false;
    gConfig.currentGiveaway.captcha = false;
    gConfig.currentGiveaway.maxPrice = null;
    try { chrome.storage.sync.set({ autoGiveawayConfig: gConfig }); } catch(e) {};

    const giveawaysHistory = await getStorageData('local', 'giveawaysHistory') || [];
    giveawaysHistory.push(giveaway);

    try { chrome.storage.local.set({ giveawaysHistory: giveawaysHistory }); } catch(e) {};
    return gConfig;
};

const findNewGiveaway = async(gConfig, port, token) => {
    const fetch = JSON.parse(JSON.stringify(await fetchUrl('GET', `https://wss-${port || 2061}.key-drop.com/v1/giveaway//list?type=active&page=0&perPage=5&status=active&sort=latest`, token)));
    if(!fetch || !fetch?.data) return createToast('error', 'error_fetch');

    const amateurGiveaways = fetch?.data?.find(el => el?.frequency == 'amateur');
    if(!amateurGiveaways) return createToast('error', 'error_fetch');

    gConfig.currentGiveaway.id = amateurGiveaways?.id;
    gConfig.currentGiveaway.deadlineTimestamp = amateurGiveaways?.deadlineTimestamp;
    gConfig.currentGiveaway.haveIJoined = amateurGiveaways?.haveIJoined;
    gConfig.currentGiveaway.maxPrice = amateurGiveaways?.prizes[0]?.price;
    try { chrome.storage.sync.set({ autoGiveawayConfig: gConfig }); } catch(e) {};
    return gConfig;
};

const joinGiveaway = async(language, gConfig, token) => {
    const fetch = JSON.parse(JSON.stringify(await fetchUrl('PUT', `https://wss-3002.key-drop.com/v1/giveaway//joinGiveaway/${gConfig?.currentGiveaway?.id}`, token)));
    if(!fetch || !fetch?.message) return createToast('error', 'error_fetch');

    const idText = `(ID: ${gConfig?.currentGiveaway?.id})`;
    const giveawayUrl = `https://key-drop.com/giveaways/keydrop/${gConfig?.currentGiveaway?.id}`;

    if(fetch?.message == "Sukces!" || fetch?.message == "Success!" || fetch?.status) {
        gConfig.currentGiveaway.haveIJoined = true;
        createToast('success', 'autogiveaway_joined', idText, giveawayUrl);
    } else if(fetch?.message?.includes('captch')) {
        gConfig.currentGiveaway.captcha = true;
        createToast('error', null, idText, giveawayUrl, `${language?.autogiveaway_error} ${language?.autogiveaway_captcha}`);
    } else
        createToast('error', null, idText, giveawayUrl, `${language?.autogiveaway_error} ${fetch?.message}`);

    try { chrome.storage.sync.set({ autoGiveawayConfig: gConfig }); } catch(e) {};
    return gConfig;
};

giveawayStart(true);

let lastAutoGiveawayButtonTime = 0;
waitForElm('#autoGiveawayButton').then(function() {
    $('#autoGiveawayButton.button-light-green').click(function (e) { 
        if((lastAutoGiveawayButtonTime + refreshGiveawayTime) <= new Date()?.getTime()) {
            lastAutoGiveawayButtonTime = new Date()?.getTime();
            giveawayStart(false);
        }
    });
});