const createUsersGiveawayList = async() => {
    const config = await getConfigData();
    if(!config?.active || !config?.token) return;
  
    const language = await getLanguageData(config?.lang);
    const serverData = await getServerData();
    if(serverData?.userGiveaways?.length <= 0) return;
  
    const panelText = {
        days: language?.userGiveaways_days,
        hours: language?.userGiveaways_hours,
        minutes: language?.userGiveaways_minutes,
        seconds: language?.userGiveaways_seconds,
        join: language?.userGiveaways_join,
        prizesPrice: language?.userGiveaways_prizesPrice,
        prizes: language?.userGiveaways_prizes,
        promocode: language?.userGiveaways_promocode,
        joined: language?.userGiveaways_joined,
        waitingPlayers: language?.userGiveaways_waitingPlayers,
        userGiveaway: language?.userGiveaways_userGiveaway,
        info_1: language?.userGiveaways_info_1,
        info_2: language?.userGiveaways_info_2,
        info_3: language?.userGiveaways_info_3,
        info_4: language?.userGiveaways_info_4
    };
  
    $('div.giveaway-keydropPlus-info').eq(0)
      .after($(document.createElement('div'))
        .addClass('container usersgiveaway-keydropPlus-list')
        .html(`<div class="order-3 mt-12 mb-6 flex w-full flex-row items-center justify-between border-b border-grey-700 lg:order-2">    <div class="-mb-px w-[12.5rem] border-b border-navy-100 pt-3 pb-4 text-navy-100 sm:w-[15.675rem]"><div class="flex items-center" style="    float: left;"><div class="mr-3 h-6 w-6"><img src="https://raw.githubusercontent.com/Juzlus/KeydropPlus/main/data/icons/KD%2B_Icon.svg" style="    position: absolute;    background: darkorange;    width: 24px;    height: 24px;    padding: 3px;    border-radius: 50%;"></div>${panelText?.userGiveaway}</div></div></div><div class="giveawaysList grid grid-cols-1 gap-2.5 rounded-xl md:grid-cols-3 xl:grid-cols-[repeat(5,1fr)] opacity-100"></div>`)
      )
  
      const panel = document?.getElementsByClassName('-mb-px hidden border-b border-navy-100 pt-3 pb-4 pr-10 text-navy-100 lg:block')[0];
      const observer = new MutationObserver(function () {
        $('.usersgiveaway-keydropPlus-list').css('display', 'none');
      });
      observer.observe(panel, { characterData: true, attributes: false, childList: false, subtree: true });
      refreshUsersGiveawaysPanel(panelText, true);
  };

  const refreshUsersGiveawaysPanel = async(panelText, isFirst) => {
        const config = await getConfigData();
        if(!config?.active) return;
  
        const serverData = await getServerData();
        if(serverData?.userGiveaways?.length <= 0) return;
        const currency = $('button.hidden.items-center.justify-center.gap-2.whitespace-nowrap.text-xs.uppercase.leading-none.text-navy-100 span.font-bold').eq(0).text()?.toString();
  
        let htmlContent = '';
        for(i = 0; i < serverData?.userGiveaways?.length; i++) {
            const el = serverData?.userGiveaways[i];
            const fetch = await fetchUrl('GET', `https://wss-2071.key-drop.com/v1/giveaway-user//giveaway/${el}`);
            if(!fetch?.data || fetch?.data?.status == "ended") {
                if(i == serverData?.userGiveaways?.length - 1)
                    lastElement(htmlContent, isFirst, panelText, i, serverData);
                continue;
            }
  
            const userGiveaway = {
                seconds: fetch?.data?.deadlineTimestamp ? (fetch?.data?.deadlineTimestamp - (new Date())?.getTime())?.toString()?.slice(0, -3) : null,
                haveIJoined: fetch?.data?.haveIJoined,
                maxUsers: fetch?.data?.maxUsers,
                minUsers: fetch?.data?.minUsers,
                promocode: fetch?.data?.organizer?.promocode,
                avatar: fetch?.data?.organizer?.steamAvatar,
                username: fetch?.data?.organizer?.username,
                members: fetch?.data?.participantCount,
    
                itemSize: fetch?.data?.prizes?.length, 
                itemColor: fetch?.data?.prizes[0]?.color,
                itemCondition: fetch?.data?.prizes[0]?.condition,
                itemCurrency: currency,
                itemImg: fetch?.data?.prizes[0]?.itemImg,
                itemPrice: fetch?.data?.prizes[0]?.price,
                itemSubtitle: fetch?.data?.prizes[0]?.subtitle,
                itemTitle: fetch?.data?.prizes[0]?.title,
            };
  
            const index = await getIndexData();
            const currencyRates = index?.currencyRates;
            const currentRate = currencyRates?.filter(el => el?.id == currency)[0]?.rate || 1;
            userGiveaway.itemPrice = (currentRate * userGiveaway?.itemPrice).toFixed(2) || 'N/A';
  
            let skinConditionFixed = '';
            switch(userGiveaway?.itemCondition) {
                case "FN":
                    skinConditionFixed = "FACTORY NEW";
                    break;
                case "MN":
                    skinConditionFixed = "MINIMAL WEAR";
                    break;
                case "FT":
                    skinConditionFixed = "FIELD TESTED";
                    break;
                case "WW":
                    skinConditionFixed = "WELL-WORN";
                    break;
                case "BS":
                    skinConditionFixed = "BATTLE-SCARRED";
                    break;
                default:
                    skinConditionFixed = "";
                    break;
            }
            const button = userGiveaway?.haveIJoined ? `<a class="button ml-2.5 h-11 w-28 px-3.5 text-[10px] sm:ml-4 button-primary" href="/pl/giveaways/user/${el}"><div class="absolute top-0 left-0 h-full w-full"></div>${panelText?.joined}</a>` : `<a class="button ml-2.5 h-11 w-28 px-3.5 text-[10px] sm:ml-4 button-light-green" href="/pl/giveaways/user/${el}"><div class="absolute top-0 left-0 h-full w-full"></div>${panelText?.join}</a>`;
            const timerPanel = userGiveaway?.seconds ?
                `<div seconds="${userGiveaway?.seconds}" class="userGiveawayTimer flex h-11 min-w-0 items-center justify-center rounded-lg bg-black px-2.5 w-full xl:w-min"><div class="flex w-7 flex-col items-center justify-center text-center"><div class="days-value font-bold tabular-nums leading-none text-white">00</div><div class="days-unit text-[7px] font-medium text-navy-100">${panelText?.days}</div></div><div class="mx-0.5 text-center text-xs font-semibold text-navy-300">:</div><div class="flex w-7 flex-col items-center justify-center text-center"><div class="hours-value font-bold tabular-nums leading-none text-white">00</div><div class="hours-unit text-[7px] font-medium text-navy-100">${panelText?.hours}</div></div><div class="mx-0.5 text-center text-xs font-semibold text-navy-300">:</div><div class="flex w-7 flex-col items-center justify-center text-center"><div class="minutes-value font-bold tabular-nums leading-none text-white">00</div><div class="minutes-unit text-[7px] font-medium text-navy-100">${panelText?.minutes}</div></div><div class="mx-0.5 text-center text-xs font-semibold text-navy-300">:</div><div class="flex w-7 flex-col items-center justify-center text-center"><div class="seconds-value font-bold tabular-nums leading-none text-white">00</div><div class="seconds-unit text-[7px] font-medium text-navy-100">${panelText?.seconds}</div></div></div>`
                : `<div class="flex h-11 min-w-0 items-center justify-center rounded-lg bg-black px-2.5 w-full xl:w-min"><div class="flex w-7 flex-col items-center justify-center text-center" style="width: 148px;"><div class="days-value font-bold tabular-nums leading-none text-white" style="font-size: .5625rem; color: rgb(220 174 100);">${panelText?.waitingPlayers?.replace('{MINUSERS}', userGiveaway?.minUsers)}</div></div></div>`;
            htmlContent += `<div class="grid-stack relative grid overflow-hidden"><div class="min-w-0" style="transform: none;"><div class="relative flex h-[23rem] w-full min-w-0 flex-col"><div class="flex h-full flex-col rounded-xl bg-navy-750"><div class="relative flex min-h-0 flex-1 flex-col rounded-xl p-4 css-1ig09f9"><svg class="icon absolute top-1/2 left-1/2 z-0 h-full w-24 -translate-x-1/2 -translate-y-1/2 transform text-navy-500" viewBox="0 0 17 19" fill="currentcolor"><g clip-path="url(#clip0_2066_22890)"><path d="M9.50393 7.38281H7.49512V10.129H9.50393V7.38281Z"></path><path d="M9.50393 11.6055H7.49512V18.9991H9.50393V11.6055Z"></path><path d="M6.05644 10.1279H1.37919C1.19796 10.1283 1.01844 10.0927 0.850932 10.0231C0.683422 9.95345 0.531225 9.85121 0.403077 9.72223C0.274928 9.59324 0.173354 9.44005 0.104183 9.27145C0.0350121 9.10285 -0.000391992 8.92216 3.27348e-06 8.73975C-0.000391992 8.55734 0.0350121 8.37664 0.104183 8.20804C0.173354 8.03944 0.274928 7.88625 0.403077 7.75727C0.531225 7.62828 0.683422 7.52605 0.850932 7.45642C1.01844 7.3868 1.19796 7.35117 1.37919 7.35157H6.05644V10.1279Z"></path><path d="M6.05634 18.9991C5.45776 18.9994 4.86496 18.8811 4.31187 18.6507C3.75877 18.4203 3.25622 18.0824 2.83295 17.6564C2.40969 17.2304 2.07401 16.7246 1.84513 16.1679C1.61624 15.6112 1.49863 15.0145 1.49902 14.412V11.6055H6.05634V18.9991Z"></path><path d="M10.9434 10.1279H15.6206C15.8018 10.1283 15.9814 10.0927 16.1489 10.0231C16.3164 9.95345 16.4686 9.85121 16.5967 9.72223C16.7249 9.59324 16.8264 9.44005 16.8956 9.27145C16.9648 9.10285 17.0002 8.92216 16.9998 8.73975C17.0002 8.55734 16.9648 8.37664 16.8956 8.20804C16.8264 8.03944 16.7249 7.88625 16.5967 7.75727C16.4686 7.62828 16.3164 7.52605 16.1489 7.45642C15.9814 7.3868 15.8018 7.35117 15.6206 7.35157H10.9434V10.1279Z"></path><path d="M10.9434 18.9991C11.5419 18.9994 12.1347 18.8811 12.6878 18.6507C13.2409 18.4203 13.7435 18.0824 14.1667 17.6564C14.59 17.2304 14.9257 16.7246 15.1546 16.1679C15.3835 15.6112 15.5011 15.0145 15.5007 14.412V11.6055H10.9434V18.9991Z"></path><path d="M7.31555 6.05471L2.75823 4.75706C2.68489 4.7311 2.61987 4.68568 2.57005 4.62561C2.52022 4.56554 2.48743 4.49304 2.47515 4.41576C2.46287 4.33849 2.47154 4.25932 2.50026 4.1866C2.52897 4.11388 2.57667 4.05031 2.6383 4.00261L5.75647 1.79962C5.80329 1.76467 5.85768 1.74138 5.91518 1.73167C5.97267 1.72197 6.03163 1.72612 6.08722 1.74379C6.14281 1.76146 6.19345 1.79215 6.23498 1.83333C6.27651 1.8745 6.30775 1.92501 6.32613 1.98069L7.79527 5.45115C7.82658 5.52407 7.83757 5.6042 7.82707 5.68293C7.81657 5.76167 7.78497 5.83604 7.73567 5.89807C7.68636 5.96011 7.62121 6.00746 7.5472 6.03505C7.47319 6.06265 7.39311 6.06944 7.31555 6.05471Z"></path><path d="M9.05446 5.54013L11.7229 0.228818C11.7524 0.163233 11.7993 0.10716 11.8586 0.0668306C11.9178 0.0265013 11.987 0.00349436 12.0585 0.000367499C12.1299 -0.00275936 12.2008 0.0141165 12.2633 0.0491183C12.3258 0.0841202 12.3775 0.135876 12.4125 0.198638L15.0809 4.69514C15.1174 4.7524 15.1394 4.81779 15.145 4.88558C15.1506 4.95337 15.1396 5.0215 15.1129 5.08403C15.0863 5.14655 15.0449 5.20156 14.9923 5.24424C14.9396 5.28692 14.8774 5.31598 14.8111 5.32888L9.47422 6.17386C9.39777 6.17856 9.32143 6.163 9.25283 6.12871C9.18423 6.09443 9.12577 6.04263 9.08328 5.97848C9.0408 5.91434 9.01578 5.8401 9.01072 5.76318C9.00566 5.68626 9.02075 5.60934 9.05446 5.54013Z"></path></g><defs><clipPath id="clip0_2066_22890"><rect width="17" height="19"></rect></clipPath></defs></svg><div class="flex w-full justify-between items-start"><div class="flex"><div class="h-6 w-6"><img src="${userGiveaway?.avatar}" style="border-radius: 50%; border: 1px solid ${userGiveaway?.itemColor}"></div><div class="ml-2"><p class="text-[10px] leading-none text-navy-100">${panelText?.promocode}</p><p class="text-xs font-semibold leading-tight text-white">${userGiveaway?.promocode}</p></div></div><div class="ml-auto flex flex-col items-start"><div class="flex ml-auto"><svg class="icon mr-1.5 h-4 w-4 text-giveaway-legend" viewBox="0 0 19 19" fill="${userGiveaway?.itemColor}"><path d="M3.958 9.499h-.792v6.333a1.583 1.583 0 0 0 1.584 1.583h3.958V9.5h-4.75Zm10.292 0H10.29v7.916h3.959a1.583 1.583 0 0 0 1.583-1.583V9.499H14.25Zm.626-3.959c.116-.385.172-.785.165-1.187a2.774 2.774 0 0 0-2.77-2.771c-1.285 0-2.142 1.173-2.695 2.442-.546-1.2-1.447-2.442-2.847-2.442a2.774 2.774 0 0 0-2.771 2.77c0 .473.063.863.165 1.188h-2.54v3.167h7.125V7.124h1.583v1.583h7.125V5.54h-2.54ZM5.54 4.353c0-.655.533-1.188 1.188-1.188.703 0 1.357 1.208 1.74 2.375H6.333c-.296 0-.792 0-.792-1.187Zm6.73-1.188c.654 0 1.187.533 1.187 1.188 0 1.187-.496 1.187-.792 1.187h-1.96c.403-1.247.99-2.375 1.565-2.375Z"></path></svg><div class="mr-1 text-xs font-semibold uppercase text-white">${panelText?.prizes}</div><div class="text-xs font-bold uppercase text-white">${userGiveaway?.itemSize}</div></div><div class="mt-1 flex items-center tabular-nums"><svg class="icon mr-1.5 h-4 w-4 text-giveaway-legend" viewBox="0 0 42 44" fill="${userGiveaway?.itemColor}"><path d="M21 19.7344C23.7626 19.7344 26.4121 20.8538 28.3657 22.8464C30.3192 24.8389 31.4166 27.5415 31.4166 30.3594V43.1094H10.5833V30.3594C10.5833 27.5415 11.6808 24.8389 13.6343 22.8464C15.5878 20.8538 18.2373 19.7344 21 19.7344ZM7.01663 26.1221C6.68508 27.2628 6.48923 28.44 6.43329 29.6284L6.41663 30.3594V43.1094H0.166626V33.5469C0.166216 31.7142 0.829185 29.9459 2.02836 28.5812C3.22754 27.2165 4.8785 26.3514 6.66454 26.1519L7.01871 26.1221H7.01663ZM34.9833 26.1221C36.8373 26.2374 38.5783 27.0698 39.8512 28.4495C41.1241 29.8292 41.833 31.6523 41.8333 33.5469V43.1094H35.5833V30.3594C35.5833 28.8867 35.375 27.4651 34.9833 26.1221ZM7.45829 13.3594C8.83963 13.3594 10.1644 13.9191 11.1411 14.9154C12.1179 15.9117 12.6666 17.2629 12.6666 18.6719C12.6666 20.0808 12.1179 21.4321 11.1411 22.4284C10.1644 23.4247 8.83963 23.9844 7.45829 23.9844C6.07696 23.9844 4.7522 23.4247 3.77544 22.4284C2.79869 21.4321 2.24996 20.0808 2.24996 18.6719C2.24996 17.2629 2.79869 15.9117 3.77544 14.9154C4.7522 13.9191 6.07696 13.3594 7.45829 13.3594ZM34.5416 13.3594C35.923 13.3594 37.2477 13.9191 38.2245 14.9154C39.2012 15.9117 39.75 17.2629 39.75 18.6719C39.75 20.0808 39.2012 21.4321 38.2245 22.4284C37.2477 23.4247 35.923 23.9844 34.5416 23.9844C33.1603 23.9844 31.8355 23.4247 30.8588 22.4284C29.882 21.4321 29.3333 20.0808 29.3333 18.6719C29.3333 17.2629 29.882 15.9117 30.8588 14.9154C31.8355 13.9191 33.1603 13.3594 34.5416 13.3594ZM21 0.609375C23.2101 0.609375 25.3297 1.50491 26.8925 3.09897C28.4553 4.69303 29.3333 6.85503 29.3333 9.10938C29.3333 11.3637 28.4553 13.5257 26.8925 15.1198C25.3297 16.7138 23.2101 17.6094 21 17.6094C18.7898 17.6094 16.6702 16.7138 15.1074 15.1198C13.5446 13.5257 12.6666 11.3637 12.6666 9.10938C12.6666 6.85503 13.5446 4.69303 15.1074 3.09897C16.6702 1.50491 18.7898 0.609375 21 0.609375Z"></path></svg><div class="whitespace-nowrap text-xs font-bold leading-tight text-white"><span class="text-white">${userGiveaway?.members}</span> / ${userGiveaway?.maxUsers}</div></div></div></div><div class="relative z-10 mx-auto mt-8 flex min-h-0 flex-1 items-center justify-between px-6 css-pdpgvr"><div style="background-image: url(${userGiveaway?.itemImg});z-index: 5;width: 182px;background-repeat: no-repeat;height: 136px;background-size: cover;"></div></div><div class="mt-2 flex items-end justify-between"><div class="flex flex-col"><span class="text-[10px] uppercase leading-none">${userGiveaway?.itemSubtitle}</span><span class="max-w-[150px] overflow-hidden truncate text-sm font-bold leading-relaxed text-white">${userGiveaway?.itemTitle}</span><span class="text-[10px] leading-none text-navy-100 css-5jgbdz">${skinConditionFixed}</span></div><div><div class="text-right text-[10px] font-medium leading-tight text-navy-100">${panelText?.prizesPrice}</div><div class="flex justify-end"><span class="text-sm font-bold leading-none" style="color: ${userGiveaway?.itemColor}">${userGiveaway?.itemPrice}&nbsp;${userGiveaway?.itemCurrency}</span></div></div></div></div><div class="flex rounded-xl bg-navy-750 px-4 py-3.5">${timerPanel}${button}</div></div></div></div></div>`;

            if(i == serverData?.userGiveaways?.length - 1)
                lastElement(htmlContent, isFirst, panelText, i, serverData);
        };
  
        setTimeout(async() => {
            return refreshUsersGiveawaysPanel(panelText, false);
        }, 60 * 1000);
};
  
const lastElement = async(htmlContent, isFirst, panelText, i, serverData) => {
    const formUrl = `https://forms.gle/vHGFv7ddQsucAKpX6`;
    if(i < 4)
        htmlContent += `<div class="grid-stack relative grid overflow-hidden"><div class="min-w-0" style="transform: none;"><div class="relative flex h-[23rem] w-full min-w-0 flex-col"><div class="flex h-full flex-col rounded-xl bg-navy-750"><div class="relative flex min-h-0 flex-1 flex-col rounded-xl p-4 css-1ig09f9"><img class="icon absolute top-1/2 left-1/2 z-0 h-full w-25 -translate-x-1/2 -translate-y-1/2 transform text-navy-500" viewBox="0 0 17 19" fill="currentcolor" src="${githubUrl}${serverData?.iconsPath}KD+_Icon.svg" style="filter: invert(14%) sepia(5%) saturate(2659%) hue-rotate(205deg) brightness(97%) contrast(85%);width: 145px;"><div class="flex w-full justify-between items-start"><div class="flex"><div class="ml-2" style="z-index: 1"><p class="text-[10px] leading-none text-navy-100" style="font-size: 12px;text-align: center;margin-top: 98px;">${panelText?.info_1}<br><br>${panelText?.info_2}<br><br>${panelText?.info_3}</p><a class="text-xs font-semibold leading-tight text-white" style="font-size: 10px;margin: 15px;width: 70px;display: block;margin-left: calc(50% - 35px);text-align: center;" href="${formUrl}" target="_blank">${panelText?.info_4}</a></div></div></div></div></div></div></div></div>`;

    $('div.usersgiveaway-keydropPlus-list div.giveawaysList').html(htmlContent);
    if(isFirst) giveawayTimer();
}

const giveawayTimer = async () => {
    $('.userGiveawayTimer')?.each(function(i) {
        let seconds = $(this)?.attr('seconds');
        if(!seconds || seconds < 0) return;
        $(this)?.attr('seconds', seconds - 1)

        let days = Math.floor(seconds / (24 * 60 * 60));
        seconds -= days * 24 * 60 * 60;
         
        let hours = Math.floor(seconds / (60 * 60));
        seconds -= hours * 3600;
         
        let minutes = Math.floor(seconds / 60); 
        seconds -= minutes * 60; 

        days = (days > 9) ? days : `0${days}`;
        hours = (hours > 9) ? hours : `0${hours}`;
        minutes = (minutes > 9) ? minutes : `0${minutes}`;
        seconds = (seconds > 9) ? seconds : `0${seconds}`;

        $(this).find('.days-value').text(days);
        $(this).find('.hours-value').text(hours);
        $(this).find('.minutes-value').text(minutes);
        $(this).find('.seconds-value').text(seconds);

        if(i == $(this)?.length - 1)
            setTimeout(async() => {
                giveawayTimer();
            }, 1000 );
    });
}

waitForElm('div.container.giveaway-keydropPlus-info').then(() => {
    createUsersGiveawayList();
});
  
waitForElm('#main-view span.break-all').then(() => {
    $('.usersgiveaway-keydropPlus-list').css('display', 'none');
});