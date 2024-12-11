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
        caseCount: language?.autoJoinFreeCaseBattle_caseCount,

        caseMode: language?.autoJoinFreeCaseBattle_caseMode,
        solo: language?.autoJoinFreeCaseBattle_solo,
        team2v2: language?.autoJoinFreeCaseBattle_team2v2,
        team3v3: language?.autoJoinFreeCaseBattle_team3v3,
        noCaseMode: language?.autoJoinFreeCaseBattle_noCaseMode
    };

    let cards = '';
    //const fetch = await fetchUrl('GET', 'https://kdrp2.com/CaseBattle/cases');
    const server = await getServerData();

    //if(!fetch || !fetch?.data) return createToast('error', 'error_fetch');
    const fastCaseBattleConfigData = await getStorageData('sync', 'fastCaseBattleConfig');
    //fetch?.data?.forEach(el => {
    //    cards += `<label class="caseCard"><input type="checkbox" ${fastCaseBattleConfigData?.casesName?.includes(el?.name) ? 'checked' : ''} name="caseCard" data-case-name="${el?.name}" style="display: none"><div class="caseData group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-navy-500 bg-navy-700" style="background: url('https://key-drop.com/uploads/skins/${el?.cover}');width:190px;height:250px;background-position: center !important;"><p class="line-clamp mx-1 mb-4 overflow-hidden break-all text-center text-base leading-tight text-white" id="nameCase" style="background: #000000ba; box-shadow: 1px 1px 16px black; padding: 4px; border-radius: 9px;">${el?.name}</p></div></label>`;
    //});
    server?.freeCaseBattle?.forEach(el => {
        cards += `<label class="caseCard"><input type="checkbox" ${fastCaseBattleConfigData?.casesName?.includes(el?.name) ? 'checked' : ''} name="caseCard" data-case-name="${el?.name}" style="display: none"><div class="caseData group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-navy-500 bg-navy-700" style="background: url('https://key-drop.com/uploads/skins/${el?.cover}');width:190px;height:250px;background-position: center !important;"><p class="line-clamp mx-1 mb-4 overflow-hidden break-all text-center text-base leading-tight text-white" id="nameCase" style="background: #000000ba; box-shadow: 1px 1px 16px black; padding: 4px; border-radius: 9px;">${el?.name}</p></div></label>`;
    });

    waitForElm('div.pb-16.pt-4.text-white').then(() => {
        $('main')
            .html(`<div class="bg-no-repeat" style="background-image: url('https://key-drop.com/web/KD/static/images/missions/missions-bg.webp?v=159'); background-position: center top; background-size: 2570px;"><div id="caseBattle-root"><div><div class="min-h-screen pt-4 pb-16"><div class="container overflow-hidden"><div class="order-2 my-5 flex w-full flex-col justify-between border-b border-navy-500 lg:order-none lg:mt-8 lg:mb-0 lg:flex-row"><div class="-mb-px hidden items-center self-end border-b border-navy-100 pb-6 pr-10 font-semibold uppercase text-white lg:flex" style="border-color: rgb(182 187 206)"><a class="-my-2 -ml-3 px-3 py-2 text-navy-100 transition-colors duration-200 hover:text-white" style="color: rgb(182 187 206)" href="/case-battle/"><svg class="icon h-4 w-4 rotate-90 transform" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor"></path></svg></a><a style="color: rgb(182 187 206)">${languageText?.title}</a></div></div></div><div class="container transition-opacity duration-500 opacity-100"><div class="pointer-events-none fixed top-0 left-4 z-50 transition-opacity duration-100 opacity-0" style="transform: translate(0px, 0px);"><div class="h-4 w-4 transform transition duration-200"><svg class="h-full w-full animate-spin text-gold" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div></div><div class="my-8 grid grid-cols-2 flex-wrap gap-2 sm:flex sm:gap-5">${cards}</div>`
                + `<div class="flex flex-wrap gap-6 pb-9 pt-5 sm:mt-8 sm:gap-12 xl:flex-nowrap"><div class="flex w-full flex-col sm:max-w-md md:w-auto lg:max-w-none xl:w-full"><div class="flex items-center gap-3"><svg class="icon h-5 w-5 text-gold-400" viewBox="0 0 48 49" fill="currentColor"><path d="m47.002 6.5-7.266.006L15.524 30.73l-2.9-2.898-2.897 2.898 5.07 5.073-5.795 5.799 2.897 2.898 5.797-5.799 5.07 5.073 2.898-2.898-2.897-2.9 24.229-24.238.006-7.238Z"></path><path d="M6.77 32.642C2.864 28.78 1.884 22.604 4.611 17.75c1.758-3.23 5.086-5.538 8.665-6.113 3.99-.677 8.194.7 10.98 3.522l7.929-7.93C26.45 1.464 17.417.222 10.33 4.423.146 10.486-1.44 24.492 6.729 32.683l.041-.04Z"></path></svg><p class="text-xs font-semibold uppercase text-navy-200">${languageText?.caseMode}</p></div><div class="rounded-md bg-navy-800 p-1.5 transition-opacity duration-200 mt-auto min-w-[300px]" style="margin-top: 15px;"><div class="relative grid h-full gap-2" style="grid-template-columns: repeat(3, minmax(65px, 1fr));"><input type="checkbox" name="caseMode" style="display: none" data-case-mode="X1" id="case-mode-1"><label data-testid="my-bttl-solo-2vs2" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-mode-1"><span class="relative"><div class="flex items-center justify-center whitespace-nowrap"><svg class="icon mr-1 h-4 w-4 flex-shrink-0" viewBox="0 0 13 11" fill="none"><path fill="currentColor" d="M10.28 10.083H2.371v-.917c0-.607.26-1.19.724-1.62a2.574 2.574 0 0 1 1.748-.671h2.966c.655 0 1.284.241 1.747.67a2.21 2.21 0 0 1 .724 1.621v.917ZM6.326 5.958a3.17 3.17 0 0 1-1.135-.21 2.991 2.991 0 0 1-.963-.595 2.746 2.746 0 0 1-.642-.893 2.577 2.577 0 0 1 0-2.104c.149-.334.367-.637.642-.893.276-.255.603-.457.963-.596A3.17 3.17 0 0 1 6.326.458c.786 0 1.54.29 2.097.805.556.516.869 1.216.869 1.945 0 .73-.313 1.429-.87 1.945a3.088 3.088 0 0 1-2.096.805Z"></path></svg>${languageText?.solo}</div></span></label><input type="checkbox" name="caseMode" style="display: none" data-case-mode="X2" id="case-mode-2"><label data-testid="my-bttl-solo-2vs2" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-mode-2"><span class="relative"><div class="flex items-center justify-center whitespace-nowrap"><svg class="icon mr-1 h-4 w-4 flex-shrink-0" viewBox="0 0 25 25" fill="currentColor"><path d="M2.69922 22.7344C2.69922 20.6126 3.54207 18.5778 5.04236 17.0775C6.54266 15.5772 8.57749 14.7344 10.6992 14.7344C12.821 14.7344 14.8558 15.5772 16.3561 17.0775C17.8564 18.5778 18.6992 20.6126 18.6992 22.7344H2.69922ZM10.6992 13.7344C7.38422 13.7344 4.69922 11.0494 4.69922 7.73438C4.69922 4.41937 7.38422 1.73438 10.6992 1.73438C14.0142 1.73438 16.6992 4.41937 16.6992 7.73438C16.6992 11.0494 14.0142 13.7344 10.6992 13.7344ZM18.0622 15.9674C19.5919 16.3605 20.9585 17.2262 21.9675 18.4412C22.9766 19.6562 23.5766 21.1585 23.6822 22.7344H20.6992C20.6992 20.1244 19.6992 17.7484 18.0622 15.9674ZM16.0392 13.6914C16.8772 12.9418 17.5474 12.0237 18.0058 10.9971C18.4642 9.97053 18.7005 8.85866 18.6992 7.73438C18.7013 6.36784 18.3518 5.02375 17.6842 3.83137C18.8169 4.05896 19.8357 4.67175 20.5677 5.56557C21.2996 6.45939 21.6994 7.5791 21.6992 8.73438C21.6995 9.44684 21.5475 10.1511 21.2533 10.8C20.9592 11.449 20.5298 12.0275 19.9938 12.4969C19.4578 12.9663 18.8277 13.3157 18.1457 13.5217C17.4636 13.7277 16.7454 13.7856 16.0392 13.6914Z"></path></svg>${languageText?.team2v2}</div></span></label><input type="checkbox" name="caseMode" style="display: none" data-case-mode="X3" id="case-mode-3"><label data-testid="my-bttl-solo-2vs2" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-mode-3"><span class="relative"><div class="flex items-center justify-center whitespace-nowrap"><svg class="icon mr-1 h-4 w-4 flex-shrink-0" viewBox="0 0 25 25" fill="currentColor"><path d="M2.69922 22.7344C2.69922 20.6126 3.54207 18.5778 5.04236 17.0775C6.54266 15.5772 8.57749 14.7344 10.6992 14.7344C12.821 14.7344 14.8558 15.5772 16.3561 17.0775C17.8564 18.5778 18.6992 20.6126 18.6992 22.7344H2.69922ZM10.6992 13.7344C7.38422 13.7344 4.69922 11.0494 4.69922 7.73438C4.69922 4.41937 7.38422 1.73438 10.6992 1.73438C14.0142 1.73438 16.6992 4.41937 16.6992 7.73438C16.6992 11.0494 14.0142 13.7344 10.6992 13.7344ZM18.0622 15.9674C19.5919 16.3605 20.9585 17.2262 21.9675 18.4412C22.9766 19.6562 23.5766 21.1585 23.6822 22.7344H20.6992C20.6992 20.1244 19.6992 17.7484 18.0622 15.9674ZM16.0392 13.6914C16.8772 12.9418 17.5474 12.0237 18.0058 10.9971C18.4642 9.97053 18.7005 8.85866 18.6992 7.73438C18.7013 6.36784 18.3518 5.02375 17.6842 3.83137C18.8169 4.05896 19.8357 4.67175 20.5677 5.56557C21.2996 6.45939 21.6994 7.5791 21.6992 8.73438C21.6995 9.44684 21.5475 10.1511 21.2533 10.8C20.9592 11.449 20.5298 12.0275 19.9938 12.4969C19.4578 12.9663 18.8277 13.3157 18.1457 13.5217C17.4636 13.7277 16.7454 13.7856 16.0392 13.6914Z"></path></svg>${languageText?.team3v3}</div></span></label></div></div></div><div class="flex w-full flex-col sm:max-w-md md:w-auto lg:max-w-none xl:w-full"><div class="flex items-center gap-3"><svg class="icon h-6 w-6 text-gold-400" viewBox="0 0 25 25" fill="currentColor"><path d="M2.69922 22.7344C2.69922 20.6126 3.54207 18.5778 5.04236 17.0775C6.54266 15.5772 8.57749 14.7344 10.6992 14.7344C12.821 14.7344 14.8558 15.5772 16.3561 17.0775C17.8564 18.5778 18.6992 20.6126 18.6992 22.7344H2.69922ZM10.6992 13.7344C7.38422 13.7344 4.69922 11.0494 4.69922 7.73438C4.69922 4.41937 7.38422 1.73438 10.6992 1.73438C14.0142 1.73438 16.6992 4.41937 16.6992 7.73438C16.6992 11.0494 14.0142 13.7344 10.6992 13.7344ZM18.0622 15.9674C19.5919 16.3605 20.9585 17.2262 21.9675 18.4412C22.9766 19.6562 23.5766 21.1585 23.6822 22.7344H20.6992C20.6992 20.1244 19.6992 17.7484 18.0622 15.9674ZM16.0392 13.6914C16.8772 12.9418 17.5474 12.0237 18.0058 10.9971C18.4642 9.97053 18.7005 8.85866 18.6992 7.73438C18.7013 6.36784 18.3518 5.02375 17.6842 3.83137C18.8169 4.05896 19.8357 4.67175 20.5677 5.56557C21.2996 6.45939 21.6994 7.5791 21.6992 8.73438C21.6995 9.44684 21.5475 10.1511 21.2533 10.8C20.9592 11.449 20.5298 12.0275 19.9938 12.4969C19.4578 12.9663 18.8277 13.3157 18.1457 13.5217C17.4636 13.7277 16.7454 13.7856 16.0392 13.6914Z"></path></svg><p class="text-xs font-semibold uppercase text-navy-200">${languageText?.players}</p></div><div class="rounded-md bg-navy-800 p-1.5 transition-opacity duration-200 mt-auto min-w-[300px] whitespace-nowrap" style="margin-top: 15px;"><div class="relative grid h-full gap-2" style="grid-template-columns: repeat(3, minmax(65px, 1fr));"><input type="checkbox" name="casePlayers" data-case-players="2" style="display: none" id="case-players-2"><label data-testid="my-bttl-number-of-players-btn" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-players-2"><span class="relative">${languageText?.two}</span></label><input type="checkbox" name="casePlayers" data-case-players="3" style="display: none" id="case-players-3"><label data-testid="my-bttl-number-of-players-btn" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-players-3"><span class="relative">${languageText?.three}</span></label><input type="checkbox" name="casePlayers" data-case-players="4" style="display: none" id="case-players-4"><label data-testid="my-bttl-number-of-players-btn" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-players-4"><span class="relative">${languageText?.four}</span></label></div></div></div><div class="flex w-full flex-col sm:col-span-1 sm:max-w-md md:w-auto lg:max-w-none xl:w-full"><div class="flex items-center gap-3"><svg class="w-5 h-5 mr-2 text-gold" style="scale: 1.2;"><use xlink:href="https://key-drop.com/web/KD/static/nav-icons.svg?05#box"></use></svg><p class="text-xs font-semibold uppercase text-navy-200">${languageText?.caseCount}</p></div><div class="rounded-md bg-navy-800 p-1.5 transition-opacity duration-200 mt-auto" style="margin-top: 15px;"><div class="relative grid h-full gap-2" style="grid-template-columns: repeat(2, minmax(65px, 1fr));"><input type="radio" name="caseCount" style="display: none" data-case-count="1" checked="" id="case-count-1"><label data-testid="my-bttl-public-private-btn" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-count-1"><span class="relative"><div class="flex items-center justify-center whitespace-nowrap">1</div></span></label><input type="radio" name="caseCount" style="display: none" data-case-count="2" checked="" id="case-count-2"><label data-testid="my-bttl-public-private-btn" class="h-8 rounded bg-navy-700 px-5 text-10px font-semibold uppercase transition-colors duration-500 hover:bg-navy-600 text-navy-400" style="align-content: center;" for="case-count-2"><span class="relative"><div class="flex items-center justify-center whitespace-nowrap">2</div></span></label></div></div></div><div class="mt-8 flex h-min flex-col rounded-lg bg-navy-700 p-4 sm:flex-row xl:mt-0 xl:ml-auto xl:px-8 xl:py-6" style="border: 10px solid rgb(23 23 28); width: 3000px"><div class="grid w-full grid-cols-2 justify-center sm:justify-start md:flex"><div class="flex flex-col text-center md:mr-4 md:border-r md:border-navy-500 md:pr-8 md:text-left" style="flex: none;"><p class="text-xs font-bold uppercase text-navy-200">Searching time</p><span class="mt-1 text-base font-semibold leading-none text-gold"><span id="minutes">02</span>:<span id="seconds">17</span>:<span id="tens">33</span></span></div><div class="flex flex-col text-center md:mr-4 md:border-r md:border-navy-500 md:pr-8 md:text-left"><p class="text-xs font-bold uppercase text-navy-200">Status</p><span class="statusText text-base font-semibold leading-none text-gold mt-1">Interrupted!</span></div><label id="autocaseBattleLabel"><input type="checkbox" name="autoCaseBattleInput" style="display: none"><button id="autoCaseBattleButton" data-active="true" class="button button-primary col-span-2 mt-4 ml-auto mr-auto h-10 w-56 self-center text-xs md:mr-0 md:mt-0 xl:ml-0"><span>Find Battle</span></button></label></div></div></div>`
                + `<div class="mt-4"><div class="flex"><svg class="icon mr-2 h-4 w-4 text-gold" viewBox="0 0 14 18" fill="none"><path fill="currentColor" d="M7 .667a4.171 4.171 0 00-4.167 4.166v2.5H2A1.667 1.667 0 00.333 9v6.666A1.667 1.667 0 002 17.334h10a1.667 1.667 0 001.666-1.666V9A1.667 1.667 0 0012 7.333h-.834v-2.5A4.171 4.171 0 007 .667zM4.5 4.833c0-1.378 1.121-2.5 2.5-2.5 1.378 0 2.5 1.122 2.5 2.5v2.5h-5v-2.5zm3.333 8.936v1.897H6.166V13.77a1.661 1.661 0 01.473-3.064 1.67 1.67 0 012.027 1.628 1.659 1.659 0 01-.833 1.436z"></path></svg><p class="text-xs font-bold uppercase text-navy-200">${languageText?.synopsis}</p></div><p class="mt-2 text-xs font-medium text-navy-200" style="margin-top: 15px">${languageText?.desc}</p></div></div></div></div></div></div>`)

        if(fastCaseBattleConfigData?.caseMode?.includes('X1')) $('[name=caseMode]').eq(0).prop('checked', true);
        if(fastCaseBattleConfigData?.caseMode?.includes('X2')) $('[name=caseMode]').eq(1).prop('checked', true);
        if(fastCaseBattleConfigData?.caseMode?.includes('X3')) $('[name=caseMode]').eq(2).prop('checked', true);

        if(fastCaseBattleConfigData?.players?.includes('2')) $('[name=casePlayers]').eq(0).prop('checked', true);
        if(fastCaseBattleConfigData?.players?.includes('3')) $('[name=casePlayers]').eq(1).prop('checked', true);
        if(fastCaseBattleConfigData?.players?.includes('4')) $('[name=casePlayers]').eq(2).prop('checked', true);

        if(fastCaseBattleConfigData?.minCaseCount == 1) $('[name=caseCount]').eq(0).prop('checked', true);
        else if(fastCaseBattleConfigData?.minCaseCount == 2) $('[name=caseCount]').eq(1).prop('checked', true);
        
        $('div.pb-16.pt-4.text-white').remove();
    });
};

let lastCaseBattleId;
const findFreeCaseBattle = async(fastCaseBattleConfig) => {
    const fetch = await fetchUrl('GET', 'https://key-drop.app/v2/battle?type=active&page=0&priceFrom=0&priceTo=undefined&searchText=&sort=latest&roundsCount=all', null, true);
    if(!fetch || !fetch?.data) return 'end';

    let filtered = await fetch?.data?.filter(el => el?.status == 'new' && el?.roundsCount >= fastCaseBattleConfig?.minCaseCount && el?.users?.length == 0 && el?.isFreeBattle == true && (fastCaseBattleConfig?.casesName?.includes(el?.cases[0]?.name) || fastCaseBattleConfig?.casesName?.includes(el?.cases[1]?.name)));
    if(!filtered || filtered?.length <= 0) return;

    filtered = await filtered?.filter(el => fastCaseBattleConfig?.caseMode?.includes(el?.mode) && (el?.mode == "X1" ? fastCaseBattleConfig?.players?.includes(`${el?.maxUserCount}`) : true));
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
        return createToast('error', 'autoJoinFreeCaseBattle_joinError', join?.message, `https://key-drop.com/case-battle/${caseBattleId}`);

    createToast('success', 'autoJoinFreeCaseBattle_joined', `(ID: ${caseBattleId})`, `https://key-drop.com/case-battle/${caseBattleId}`);
    setTimeout(async() => {
        const index = await getIndexData();
        const fetchGameData = await fetchUrl('GET', `https://kdrp2.com/CaseBattle/gameFullData/${caseBattleId}`);
        if(!fetchGameData || !fetchGameData?.data?.wonSteamId) return;
        const userSteamId = index?.steamId;
        const wonSteamId = fetchGameData?.data?.wonSteamId;
        if(userSteamId == wonSteamId)
            createToast('info', `autoJoinFreeCaseBattle_winBattle`, `(ID: ${caseBattleId})`, `https://key-drop.com/case-battle/${caseBattleId}`);
        else
            createToast('info', `autoJoinFreeCaseBattle_lostBattle`, `(ID: ${caseBattleId})`, `https://key-drop.com/case-battle/${caseBattleId}`);
    }, 5 * 1000);

    return "end";
};

createAutoCaseBattlePanel();

waitForElm('#autoCaseBattleButton').then(() => {
    document.getElementById('autoCaseBattleButton').addEventListener("click", autoJoinCaseBattle);
});

let autoJoinActive = false;
let Interval, IntervalJoin;
let minutes = 0;
let seconds = 0;
let tens = 0;
let lastTimeActive;
let fastCaseBattleData
let count = 0;

function autoJoinCaseBattle() {
    let casesName = [];
    let playersNumber = [];
    let caseMode = [];

    const cases = $('[name=caseCard]:checked');
    for(i = 0; i < cases?.length; i++)
        casesName?.push($(cases[i]).attr('data-case-name'));

    const players = $('[name=casePlayers]:checked');
    for(i = 0; i < players?.length; i++)
        playersNumber?.push($(players[i]).attr('data-case-players'));

    const caseModes = $('[name=caseMode]:checked');
    for(i = 0; i < caseModes?.length; i++)
        caseMode?.push($(caseModes[i]).attr('data-case-mode'));
    
    const caseCount = $('[name=caseCount]:checked').eq(0).attr('data-case-count') || 1;
    const fastCaseBattleConfig = {
        players: playersNumber,
        casesName: casesName,
        minCaseCount: caseCount,
        caseMode: caseMode
    };

    if(fastCaseBattleConfig?.caseMode?.length <= 0) return createToast('error', 'autoJoinFreeCaseBattle_noCaseMode');
    if(fastCaseBattleConfig?.caseMode?.includes('X1') && fastCaseBattleConfig?.players?.length <= 0)
        return createToast('error', 'autoJoinFreeCaseBattle_noPlayers');
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
        minutes = 0;
        seconds = 0; 
        tens = 0; 
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