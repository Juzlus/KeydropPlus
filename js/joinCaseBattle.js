const timerCooldown = 500;

const createAutoCaseBattlePanel = async() => {
    const config = await getConfigData();
    if(!config?.active) return;
    const language = await getLanguageData(config?.lang);

    const languageText = {
        title: language?.autoJoinFreeCaseBattle_title,
        players: language?.autoJoinFreeCaseBattle_players,
        two: language?.autoJoinFreeCaseBattle_two,
        three: language?.autoJoinFreeCaseBattle_three,
        four: language?.autoJoinFreeCaseBattle_four,
        time: language?.autoJoinFreeCaseBattle_time,
        status: language?.autoJoinFreeCaseBattle_status,
        find: language?.autoJoinFreeCaseBattle_find,
        synopsis: language?.autoJoinFreeCaseBattle_synopsis,
        desc: language?.autoJoinFreeCaseBattle_desc,
        noCaseName: language?.autoJoinFreeCaseBattle_noCaseName,
        noPlayers: language?.autoJoinFreeCaseBattle_noPlayers,
        search: language?.autoJoinFreeCaseBattle_search,
        notFound: language?.autoJoinFreeCaseBattle_notFound,
        interrupted: language?.autoJoinFreeCaseBattle_interrupted,
        caseCount: language?.autoJoinFreeCaseBattle_caseCount
    };

    let cards = '';
    const fetch = await fetchUrl('GET', 'https://kdrp2.com/CaseBattle/cases');
    const server = await getServerData();

    if(!fetch || !fetch?.data) return createToast('error', 'error_fetch');
    const fastCaseBattleConfigData = await getStorageData('sync', 'fastCaseBattleConfig');
    fetch?.data?.forEach(el => {
        cards += `<label class="caseCard"><input type="checkbox" ${fastCaseBattleConfigData?.casesName?.includes(el?.name) ? 'checked' : ''} name="caseCard" data-case-name="${el?.name}" style="display: none"><div class="caseData group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-navy-500 bg-navy-700" style="background: url('https://key-drop.com/uploads/skins/${el?.cover}');width:190px;height:250px;background-position: center !important;"><p class="line-clamp mx-1 mb-4 overflow-hidden break-all text-center text-base leading-tight text-white" id="nameCase" style="background: #000000ba; box-shadow: 1px 1px 16px black; padding: 4px; border-radius: 9px;">${el?.name}</p></div></label>`;
    });
    server?.freeCaseBattle?.forEach(el => {
        cards += `<label class="caseCard"><input type="checkbox" ${fastCaseBattleConfigData?.casesName?.includes(el?.name) ? 'checked' : ''} name="caseCard" data-case-name="${el?.name}" style="display: none"><div class="caseData group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-navy-500 bg-navy-700" style="background: url('https://key-drop.com/uploads/skins/${el?.cover}');width:190px;height:250px;background-position: center !important;"><p class="line-clamp mx-1 mb-4 overflow-hidden break-all text-center text-base leading-tight text-white" id="nameCase" style="background: #000000ba; box-shadow: 1px 1px 16px black; padding: 4px; border-radius: 9px;">${el?.name}</p></div></label>`;
    });
    $('main')
        .html(`<div class="bg-no-repeat" style="background-image: url(/web/KD/static/images/bg.png); background-position: center top; background-size: 2570px;"><div id="caseBattle-root"><div><div class="min-h-screen pt-4 pb-16"><div class="container overflow-hidden"><div class="order-2 my-5 flex w-full flex-col justify-between border-b border-grey-700 lg:order-none lg:mt-8 lg:mb-0 lg:flex-row"><div class="-mb-px hidden items-center self-end border-b border-navy-100 pb-6 pr-10 font-semibold uppercase text-white lg:flex"><a class="-my-2 -ml-3 px-3 py-2 text-navy-100 transition-colors duration-200 hover:text-white" href="/pl/case-battle/"><svg class="icon h-4 w-4 rotate-90 transform" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor"></path></svg></a>${languageText?.title}</div></div></div><div class="container transition-opacity duration-500 opacity-100"><div class="pointer-events-none fixed top-0 left-4 z-50 transition-opacity duration-100 opacity-0" style="transform: translate(0px, 0px);"><div class="h-4 w-4 transform transition duration-200"><svg class="h-full w-full animate-spin text-gold" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div><div class="my-8 grid grid-cols-2 flex-wrap gap-2 sm:flex sm:gap-5">${cards}</div><div class="mt-4 flex flex-col border-t xl:flex-row border-navy-500 pt-4"><div class="flex flex-col"><div class="flex"><svg class="icon mr-2 h-4 w-4 text-gold" viewBox="0 0 42 44" fill="currentColor"><path d="M21 19.7344C23.7626 19.7344 26.4121 20.8538 28.3657 22.8464C30.3192 24.8389 31.4166 27.5415 31.4166 30.3594V43.1094H10.5833V30.3594C10.5833 27.5415 11.6808 24.8389 13.6343 22.8464C15.5878 20.8538 18.2373 19.7344 21 19.7344ZM7.01663 26.1221C6.68508 27.2628 6.48923 28.44 6.43329 29.6284L6.41663 30.3594V43.1094H0.166626V33.5469C0.166216 31.7142 0.829185 29.9459 2.02836 28.5812C3.22754 27.2165 4.8785 26.3514 6.66454 26.1519L7.01871 26.1221H7.01663ZM34.9833 26.1221C36.8373 26.2374 38.5783 27.0698 39.8512 28.4495C41.1241 29.8292 41.833 31.6523 41.8333 33.5469V43.1094H35.5833V30.3594C35.5833 28.8867 35.375 27.4651 34.9833 26.1221ZM7.45829 13.3594C8.83963 13.3594 10.1644 13.9191 11.1411 14.9154C12.1179 15.9117 12.6666 17.2629 12.6666 18.6719C12.6666 20.0808 12.1179 21.4321 11.1411 22.4284C10.1644 23.4247 8.83963 23.9844 7.45829 23.9844C6.07696 23.9844 4.7522 23.4247 3.77544 22.4284C2.79869 21.4321 2.24996 20.0808 2.24996 18.6719C2.24996 17.2629 2.79869 15.9117 3.77544 14.9154C4.7522 13.9191 6.07696 13.3594 7.45829 13.3594ZM34.5416 13.3594C35.923 13.3594 37.2477 13.9191 38.2245 14.9154C39.2012 15.9117 39.75 17.2629 39.75 18.6719C39.75 20.0808 39.2012 21.4321 38.2245 22.4284C37.2477 23.4247 35.923 23.9844 34.5416 23.9844C33.1603 23.9844 31.8355 23.4247 30.8588 22.4284C29.882 21.4321 29.3333 20.0808 29.3333 18.6719C29.3333 17.2629 29.882 15.9117 30.8588 14.9154C31.8355 13.9191 33.1603 13.3594 34.5416 13.3594ZM21 0.609375C23.2101 0.609375 25.3297 1.50491 26.8925 3.09897C28.4553 4.69303 29.3333 6.85503 29.3333 9.10938C29.3333 11.3637 28.4553 13.5257 26.8925 15.1198C25.3297 16.7138 23.2101 17.6094 21 17.6094C18.7898 17.6094 16.6702 16.7138 15.1074 15.1198C13.5446 13.5257 12.6666 11.3637 12.6666 9.10938C12.6666 6.85503 13.5446 4.69303 15.1074 3.09897C16.6702 1.50491 18.7898 0.609375 21 0.609375Z"></path></svg><p class="text-xs font-bold uppercase text-navy-200">${languageText?.players}</p></div><div class="mt-4 grid grid-cols-2 gap-3 sm:flex sm:gap-0 sm:space-x-3"><label><input type="checkbox" name="casePlayers" data-case-players=2 style="display: none"><a class="playersData button button-secondary cursor-pointer">${languageText?.two}</a></label><label><input type="checkbox" name="casePlayers" data-case-players=3 style="display: none"><a class="playersData button button-secondary cursor-pointer">${languageText?.three}</a></label><label><input type="checkbox" name="casePlayers" data-case-players=4 style="display: none"><a class="playersData button button-secondary cursor-pointer">${languageText?.four}</a></label></div></div><div class="ml-8 flex flex-col"><div class="flex"><svg class="w-5 h-5 mr-2 text-gold"><use xlink:href="https://key-drop.com/web/KD/static/nav-icons.svg?05#box"></use></svg><p class="text-xs font-bold uppercase text-navy-200">${languageText?.caseCount}</p></div><div class="mt-4 grid grid-cols-2 gap-3 sm:flex sm:gap-0 sm:space-x-3"><label><input type="radio" name="caseCount" style="display: none" data-case-count="1" checked=""><a class="playersData button button-secondary cursor-pointer">1</a></label><label><input type="radio" name="caseCount" style="display: none" data-case-count="2"><a class="playersData button button-secondary cursor-pointer">2</a></label></div></div><div style="margin: 15px 25px;" class="mt-8 flex h-min flex-col rounded-lg bg-navy-700 p-4 sm:flex-row xl:mt-0 xl:ml-auto xl:px-8 xl:py-6"><div class="grid w-full grid-cols-2 justify-center sm:justify-start md:flex"><div class="flex flex-col text-center md:mr-4 md:border-r md:border-navy-500 md:pr-8 md:text-left"><p class="text-xs font-bold uppercase text-navy-200">${languageText?.time}</p><span class="mt-1 text-base font-semibold leading-none text-gold"><span id="minutes">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></span></div><div class="flex flex-col text-center md:mr-4 md:border-r md:border-navy-500 md:pr-8 md:text-left"><p class="text-xs font-bold uppercase text-navy-200">${languageText?.status}</p><span class="statusText text-base font-semibold leading-none text-gold mt-1">-</span></div><label id="autocaseBattleLabel"><input type="checkbox" name="autoCaseBattleInput" style="display: none"><button id="autoCaseBattleButton" data-active=true class="button button-primary col-span-2 mt-4 ml-auto mr-auto h-10 w-56 self-center text-xs md:mr-0 md:mt-0 xl:ml-0"><span>${languageText?.find}</span></button></label></div></div></div><div class="mt-4"><div class="flex"><svg class="icon mr-2 h-4 w-4 text-gold" viewBox="0 0 14 18" fill="none"><path fill="currentColor" d="M7 .667a4.171 4.171 0 00-4.167 4.166v2.5H2A1.667 1.667 0 00.333 9v6.666A1.667 1.667 0 002 17.334h10a1.667 1.667 0 001.666-1.666V9A1.667 1.667 0 0012 7.333h-.834v-2.5A4.171 4.171 0 007 .667zM4.5 4.833c0-1.378 1.121-2.5 2.5-2.5 1.378 0 2.5 1.122 2.5 2.5v2.5h-5v-2.5zm3.333 8.936v1.897H6.166V13.77a1.661 1.661 0 01.473-3.064 1.67 1.67 0 012.027 1.628 1.659 1.659 0 01-.833 1.436z"></path></svg><p class="text-xs font-bold uppercase text-navy-200">${languageText?.synopsis}</p></div><p class="mt-2 text-2xs font-medium text-navy-200">${languageText?.desc}</p></div></div></div></div></div></div>`)

    if(fastCaseBattleConfigData?.players?.includes('2')) $('[name=casePlayers]').eq(0).prop('checked', true);
    if(fastCaseBattleConfigData?.players?.includes('3')) $('[name=casePlayers]').eq(1).prop('checked', true);
    if(fastCaseBattleConfigData?.players?.includes('4')) $('[name=casePlayers]').eq(2).prop('checked', true);
    if(fastCaseBattleConfigData?.minCaseCount == 2) $('[name=caseCount]').eq(1).prop('checked', true);
    else if(fastCaseBattleConfigData?.minCaseCount == 3) $('[name=caseCount]').eq(2).prop('checked', true);

    waitForElm('div.pb-16.pt-4.text-white').then(() => {
        $('div.pb-16.pt-4.text-white').remove();
    });
};

let lastCaseBattleId;
const findFreeCaseBattle = async(fastCaseBattleConfig) => {
    const fetch = await fetchUrl('GET', 'https://key-drop.app/v2/battle?type=active&page=0&priceFrom=0&priceTo=undefined&searchText=&sort=latest&roundsCount=all', null, true);
    if(!fetch || !fetch?.data) return 'end';

    const filtered = await fetch?.data?.filter(el => el?.status == 'new' && el?.freeBattleTicketCost == 1 && el?.roundsCount >= fastCaseBattleConfig?.minCaseCount && el?.users?.length == 0 && fastCaseBattleConfig?.players?.includes(`${el?.maxUserCount}`) && el?.isFreeBattle == true && (fastCaseBattleConfig?.casesName?.includes(el?.cases[0]?.name) || fastCaseBattleConfig?.casesName?.includes(el?.cases[1]?.name)));
    if(!filtered || filtered?.length <= 0) return;

    if(fastCaseBattleConfig?.minCaseCount == 2) {
        if(filtered[0]?.cases?.length < 2)
            return
        else if(!fastCaseBattleConfig?.casesName?.includes(filtered[0]?.cases[0]?.name) || !fastCaseBattleConfig?.casesName?.includes(filtered[0]?.cases[1]?.name))
            return;
    }

    const caseBattleId = filtered[0]?.id;
    if(!caseBattleId) return;
    if(lastCaseBattleId == caseBattleId) return;
    const slot = Math.floor(Math.random()*fastCaseBattleConfig?.players[fastCaseBattleConfig?.players?.length-1]);
    const config = await getConfigData();
    if(!config) return;
    lastCaseBattleId = caseBattleId;
    const join = await fetchUrl('POST', `https://kdrp2.com/CaseBattle/joinCaseBattle/${caseBattleId}/${slot}`, config?.token);

    if(!join?.success)
        return createToast('error', 'autoJoinFreeCaseBattle_joinError', join?.message, `https://key-drop.com/pl/case-battle/${caseBattleId}`);

    createToast('success', 'autoJoinFreeCaseBattle_joined', `(ID: ${caseBattleId})`, `https://key-drop.com/pl/case-battle/${caseBattleId}`);
    setTimeout(async() => {
        const index = await getIndexData();
        const fetchGameData = await fetchUrl('GET', `https://kdrp2.com/CaseBattle/gameFullData/${caseBattleId}`);
        if(!fetchGameData || !fetchGameData?.data?.wonSteamId) return;
        const userSteamId = index?.steamId;
        const wonSteamId = fetchGameData?.data?.wonSteamId;
        if(userSteamId == wonSteamId)
            createToast('info', `autoJoinFreeCaseBattle_winBattle`, `(ID: ${caseBattleId})`, `https://key-drop.com/pl/case-battle/${caseBattleId}`);
        else
            createToast('info', `autoJoinFreeCaseBattle_lostBattle`, `(ID: ${caseBattleId})`, `https://key-drop.com/pl/case-battle/${caseBattleId}`);
    }, 5 * 1000);

    return "end";
};

createAutoCaseBattlePanel();

waitForElm('#autoCaseBattleButton').then(() => {
    document.getElementById('autoCaseBattleButton').addEventListener("click", autoJoinCaseBattle);
});

let autoJoinActive = false;
let Interval, IntervalJoin;
let minutes = 00;
let seconds = 00;
let tens = 00;
let lastTimeActive;
let fastCaseBattleData
let count = 0;

function autoJoinCaseBattle() {
    let casesName = [];
    let playersNumber = [];

    const cases = $('[name=caseCard]:checked');
    for(i=0; i<cases?.length; i++)
        casesName?.push($(cases[i]).attr('data-case-name'));

    const players = $('[name=casePlayers]:checked');
    for(i=0; i<players?.length; i++)
        playersNumber?.push($(players[i]).attr('data-case-players'));
    
    const caseCount = $('[name=caseCount]:checked').eq(0).attr('data-case-count') || 1;
    const fastCaseBattleConfig = {
        players: playersNumber,
        casesName: casesName,
        minCaseCount: caseCount,
    };

    if(fastCaseBattleConfig?.players?.length <= 0) return createToast('error', 'autoJoinFreeCaseBattle_noPlayers');
    if(fastCaseBattleConfig?.casesName?.length <= 0) return createToast('error', 'autoJoinFreeCaseBattle_noCaseName');

    try { chrome.storage.sync.set({ fastCaseBattleConfig: fastCaseBattleConfig }) } catch(e) {};
    fastCaseBattleData = fastCaseBattleConfig;

    autoJoinActive = !autoJoinActive;
    if(autoJoinActive) {
        if(lastTimeActive+10000 >= new Date().getTime()) {
            autoJoinActive = !autoJoinActive;
            return createToast('error', 'autoJoinFreeCaseBattle_wait10s');
        }
        
        Interval = setInterval(startTimer, 10);
        IntervalJoin = setInterval(checkCaseBattle, timerCooldown);
        minutes = 00;
        seconds = 00; 
        tens = 00; 
        count = 0;
        $('span#minutes').text(`00`);
        $('span#seconds').text(`00`);
        changeText('#autoCaseBattleButton span', 'autoJoinFreeCaseBattle_interrupt');
        return changeText('.statusText', 'autoJoinFreeCaseBattle_search');
    } else {
        clearInterval(Interval);
        clearInterval(IntervalJoin);
        lastTimeActive = new Date().getTime();
        changeText('#autoCaseBattleButton span', 'autoJoinFreeCaseBattle_find');
        return changeText('.statusText', 'autoJoinFreeCaseBattle_interrupted');
    }
};

const changeText = async(element, text) => {
    const config = await getConfigData();
    if(!config?.active) return;
    const language = await getLanguageData(config?.lang);
    if(!language) return;
    $(element).html(language[text]);
};

function startTimer () {
    if(count >= (timerCooldown == 1000 ? 601 : 1201) || (minutes >= 10 && seconds >= 1)) {
        autoJoinActive = false;
        clearInterval(Interval);
        clearInterval(IntervalJoin);
        lastTimeActive = new Date().getTime();
        changeText('.statusText', 'autoJoinFreeCaseBattle_notFound');
        changeText('#autoCaseBattleButton span', 'autoJoinFreeCaseBattle_find');
        return createToast('warning', 'autoJoinFreeCaseBattle_notFound');
    }
    
    const fullTens = tens + (seconds * 100) + (minutes * 60 * 100) + 1000;
    if(timerCooldown == 1000 ? count : Math?.floor(count/2) * 100 > fullTens) {
        const timerSecons = timerCooldown == 1000 ? count : Math?.floor(count/2);
        minutes =  Math.floor(timerSecons/60);
        seconds = timerSecons%60;
    }

    tens++;
    
    if(tens <= 9)
        $('span#tens').text(`0${tens}`);
    
    if(tens > 9)
        $('span#tens').text(`${tens}`);
    
    if(tens > 99) {
        seconds++;
        $('span#seconds').text(`0${seconds}`);
        tens = 0;
        $('span.tens').text(`00`);
    }
    
    if(seconds > 9)
        $('span#seconds').text(`${seconds}`);

    if(seconds > 59) {
        minutes++;
        seconds = 0;
        tens = 0;
        $('span#seconds').text(`00`);
        $('span#tens').text(`00`);
        $('span#minutes').text(`0${minutes}`);
    }

    if(minutes > 9)
        $('span#minutes').text(`${minutes}`);
};

const checkCaseBattle = async() => {
    count++;
    if(autoJoinActive) {
        const result = await findFreeCaseBattle(fastCaseBattleData);
        if(result == "end" || (minutes >= 10 && seconds >= 1 && tens >= 0)) {
            if(result !== 'end') {
                changeText('.statusText', 'autoJoinFreeCaseBattle_notFound');
                createToast('warning', 'autoJoinFreeCaseBattle_notFound');
            } else
                changeText('.statusText', 'autoJoinFreeCaseBattle_found');

            autoJoinActive = false;
            clearInterval(Interval);
            clearInterval(IntervalJoin);
            lastTimeActive = new Date().getTime();
            changeText('#autoCaseBattleButton span', 'autoJoinFreeCaseBattle_find');
        }
    }
};