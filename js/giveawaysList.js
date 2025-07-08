const createCard = async() => {
    const config = await getConfigData();
    let autoGiveawayConfig = await getAutoGiveawayConfigData();
    if(!config?.active || !config?.token) return;

    const language = await getLanguageData(config?.lang);
    const text ={
        title: language?.autogiveaway_title,
        search: language?.autogiveaway_search
    }

    const amateurGiveaway = $('#main-view div.grid-stack.relative.grid.overflow-hidden').eq(4);
    amateurGiveaway.css({ display: autoGiveawayConfig?.active ? 'none' : 'block' });
    amateurGiveaway
        .after($(document.createElement('div'))
            .html(`<div id="giveawaySearch" class="relative grid overflow-hidden" style="margin-bottom: 10px; display: ${autoGiveawayConfig?.active ? 'block' : 'none'}; border: 1px solid #77ff9d30;border-radius: 10px;height: 368px;"><div class="min-w-0" style="transform: none;"><div class="relative flex h-[23rem] w-full min-w-0 flex-col"><div class="flex h-full flex-col rounded-xl bg-navy-750"><div class="relative flex min-h-0 flex-1 flex-col rounded-xl p-4 css-1ig09f9 text-center"><h2 class="uppercase" style="font-size: 22px; margin-top: 10px;">${text?.title}</h2>            <svg class="icon absolute top-1/2 left-1/2 z-0 h-full w-30 -translate-x-1/2 -translate-y-1/2 transform text-navy-500" viewBox="0 0 17 19" fill="currentColor"><g clip-path="url(#clip0_2066_22890)"><path d="M9.50393 7.38281H7.49512V10.129H9.50393V7.38281Z"></path><path d="M9.50393 11.6055H7.49512V18.9991H9.50393V11.6055Z"></path><path d="M6.05644 10.1279H1.37919C1.19796 10.1283 1.01844 10.0927 0.850932 10.0231C0.683422 9.95345 0.531225 9.85121 0.403077 9.72223C0.274928 9.59324 0.173354 9.44005 0.104183 9.27145C0.0350121 9.10285 -0.000391992 8.92216 3.27348e-06 8.73975C-0.000391992 8.55734 0.0350121 8.37664 0.104183 8.20804C0.173354 8.03944 0.274928 7.88625 0.403077 7.75727C0.531225 7.62828 0.683422 7.52605 0.850932 7.45642C1.01844 7.3868 1.19796 7.35117 1.37919 7.35157H6.05644V10.1279Z"></path><path d="M6.05634 18.9991C5.45776 18.9994 4.86496 18.8811 4.31187 18.6507C3.75877 18.4203 3.25622 18.0824 2.83295 17.6564C2.40969 17.2304 2.07401 16.7246 1.84513 16.1679C1.61624 15.6112 1.49863 15.0145 1.49902 14.412V11.6055H6.05634V18.9991Z"></path><path d="M10.9434 10.1279H15.6206C15.8018 10.1283 15.9814 10.0927 16.1489 10.0231C16.3164 9.95345 16.4686 9.85121 16.5967 9.72223C16.7249 9.59324 16.8264 9.44005 16.8956 9.27145C16.9648 9.10285 17.0002 8.92216 16.9998 8.73975C17.0002 8.55734 16.9648 8.37664 16.8956 8.20804C16.8264 8.03944 16.7249 7.88625 16.5967 7.75727C16.4686 7.62828 16.3164 7.52605 16.1489 7.45642C15.9814 7.3868 15.8018 7.35117 15.6206 7.35157H10.9434V10.1279Z"></path><path d="M10.9434 18.9991C11.5419 18.9994 12.1347 18.8811 12.6878 18.6507C13.2409 18.4203 13.7435 18.0824 14.1667 17.6564C14.59 17.2304 14.9257 16.7246 15.1546 16.1679C15.3835 15.6112 15.5011 15.0145 15.5007 14.412V11.6055H10.9434V18.9991Z"></path><path d="M7.31555 6.05471L2.75823 4.75706C2.68489 4.7311 2.61987 4.68568 2.57005 4.62561C2.52022 4.56554 2.48743 4.49304 2.47515 4.41576C2.46287 4.33849 2.47154 4.25932 2.50026 4.1866C2.52897 4.11388 2.57667 4.05031 2.6383 4.00261L5.75647 1.79962C5.80329 1.76467 5.85768 1.74138 5.91518 1.73167C5.97267 1.72197 6.03163 1.72612 6.08722 1.74379C6.14281 1.76146 6.19345 1.79215 6.23498 1.83333C6.27651 1.8745 6.30775 1.92501 6.32613 1.98069L7.79527 5.45115C7.82658 5.52407 7.83757 5.6042 7.82707 5.68293C7.81657 5.76167 7.78497 5.83604 7.73567 5.89807C7.68636 5.96011 7.62121 6.00746 7.5472 6.03505C7.47319 6.06265 7.39311 6.06944 7.31555 6.05471Z"></path><path d="M9.05446 5.54013L11.7229 0.228818C11.7524 0.163233 11.7993 0.10716 11.8586 0.0668306C11.9178 0.0265013 11.987 0.00349436 12.0585 0.000367499C12.1299 -0.00275936 12.2008 0.0141165 12.2633 0.0491183C12.3258 0.0841202 12.3775 0.135876 12.4125 0.198638L15.0809 4.69514C15.1174 4.7524 15.1394 4.81779 15.145 4.88558C15.1506 4.95337 15.1396 5.0215 15.1129 5.08403C15.0863 5.14655 15.0449 5.20156 14.9923 5.24424C14.9396 5.28692 14.8774 5.31598 14.8111 5.32888L9.47422 6.17386C9.39777 6.17856 9.32143 6.163 9.25283 6.12871C9.18423 6.09443 9.12577 6.04263 9.08328 5.97848C9.0408 5.91434 9.01578 5.8401 9.01072 5.76318C9.00566 5.68626 9.02075 5.60934 9.05446 5.54013Z"></path></g><defs><clipPath id="clip0_2066_22890"><rect width="17" height="19"></rect></clipPath></defs></svg><div style="                position: absolute;                width: 190px;                top: 116px;                left: 17px;                transform: rotate(45deg) translateX(10px) rotate(-45deg);                animation: searchGiveawy 2s linear infinite;            ">                <img src="https://github.com/Juzlus/KeydropPlus/blob/main/data/icons/magnifier.png?raw=true">            </div>                                                <div class="h-15 w-15" style="                position: absolute;                margin-left: calc(50% - 44px);                margin-top: 47%;            "><svg class="icon h-full w-full text-giveaway-amateur" viewBox="0 0 24 25"><circle cx="12.049" cy="12.478" r="11.693" fill="currentColor"></circle><path fill="#08180e" d="m15.322 8.644-4.004 4.005.73.732 4.006-4.005a5.175 5.175 0 0 1-4.005 8.446 5.175 5.175 0 0 1-5.173-5.173 5.175 5.175 0 0 1 8.446-4.005Z"></path></svg></div><div class="relative z-10 mx-auto mt-8 flex min-h-0 flex-1 items-center justify-between css-pdpgvr"></div><p class="col-span-7 self-center text-center text-[10px] font-semibold uppercase">${text?.search}</p></div></div></div></div></div>`)
        );

    /*
    const panel = document?.getElementsByClassName('-mb-px hidden border-b border-navy-100 pt-3 pb-4 pr-10 text-navy-100 lg:block')[0];
    const observer = new MutationObserver(function () {
      $('.giveaway-keydropPlus-info').css('display', 'none');
    });

    if (panel)
      observer.observe(panel, { characterData: true, attributes: false, childList: false, subtree: true });
    */
};

const createGiveawayListPanel = async() => {
  const config = await getConfigData();
  if(!config?.active || !config?.token) return;

  const autoGiveawayConfig = await getAutoGiveawayConfigData();
  const serverData = await getServerData();
  const language = await getLanguageData(config?.lang);

  const panelText = {
    history: language?.autogiveaway_history,
    settings: language?.autogiveaway_settings,
    settings_p1: language?.autogiveaway_settings_p1,
    settings_a1: language?.autogiveaway_settings_a1,
    settings_p2: language?.autogiveaway_settings_p2,
    settings_a2: language?.autogiveaway_settings_a2,
    settings_p3: language?.autogiveaway_settings_p3,
    settings_a3: language?.autogiveaway_settings_a3,
    settings_p4: language?.autogiveaway_settings_p4,
    settings_a4: language?.autogiveaway_settings_a4,
    settings_p5: language?.autogiveaway_settings_p5,
    settings_a5: language?.autogiveaway_settings_a5,
    settings_desc: language?.autogiveaway_settings_desc,
    start: language?.autogiveaway_start,
    disable: language?.autogiveaway_disable,
    id: language?.autogiveaway_id,
    salary: language?.autogiveaway_salary,
    joined2: language?.autogiveaway_joined2,
    endDate: language?.autogiveaway_endDate,
  };

  $('#main-view div.min-h-screen.pb-16 div.container').eq(2)
    .after($(document.createElement('div'))
      .addClass('container giveaway-keydropPlus-info')
      .html(`<div class="order-3 mt-12 mb-6 flex w-full flex-row items-center justify-between border-b border-grey-700 lg:order-2">    <div class="-mb-px w-[12.5rem] border-b border-navy-100 pt-3 pb-4 text-navy-100 sm:w-[15.675rem]"><div class="flex items-center" style="    float: left;"><div class="mr-3 h-6 w-6"><img src="${githubUrl}${serverData?.iconsPath}KD%2B_Icon.svg" style="    position: absolute;    background: darkorange;    width: 24px;    height: 24px;    padding: 3px;    border-radius: 50%;"></div>Keydrop Plus</div></div></div><div class="h-[23rem] overflow-hidden" style="height: auto;">    <div style="    float: left;    width: 28%;"><h3 class="mb-3 text-center text-xl font-bold uppercase" style="    margin-bottom: 20px;">${panelText?.settings}</h3>    <p>${panelText?.settings_p1}<label class="switch kdp-button" style="    margin-left: 22.6%;">  <input id="notificationSwitch" type="checkbox">  <span class="slider round" style=""></span></label></p>    <a class="desc">${panelText?.settings_a1}</a><p>${panelText?.settings_p5}: <input placeholder="0" value="0" min="0" max="999" type="number" id="giveawayMinPrice"><a style="color: darkseagreen;" id="giveawayMinPriceCurrency"> PLN</a></p><a class="desc">${panelText?.settings_a5}</a><p>${panelText?.settings_p3}: <a style="color: darkseagreen;" id="giveawayWinnersCount">N/A</a></p><a class="desc">${panelText?.settings_a3}</a><p>${panelText?.settings_p4}: <a style="    color: darkseagreen;" id="giveawayWinnersPrice">N/A</a></p><a class="desc">${panelText?.settings_a4}</a><button id="autoGiveawayButton" class="button ml-2.5 h-11 w-28 px-3.5 text-[10px] sm:ml-4 button-light-green" style="font-weight: bolder;width: 170px;margin-left: calc(50% - 85px);margin-top: 15px;margin-bottom: 15px;">${panelText?.start}</button><a class="desc" style="    font-size: 11px;">${panelText?.settings_desc}</a></div><div style="    float: left;    width: 72%;"><div class="pb-3"><h3 class="mb-3 text-center text-xl font-bold uppercase">${panelText?.history}</h3><div class="scroll-container custom-scrollbar overflow-auto css-nqdl3y" style="    border: 1px solid #a9a9a914;    border-radius: 20px;    max-height: 375px;"><table id="giveawaysListTable" class="w-full table-fixed text-xs leading-none text-navy-200 css-s83462"><thead style="    background: #ffffff0a;"><tr class="text-left uppercase"><th class="px-2 py-4 text-center text-xs font-semibold">${panelText?.id}</th><th class="px-2 py-4 text-center text-xs font-semibold">${panelText?.salary}</th><th class="px-2 py-4 text-center text-xs font-semibold">${panelText?.joined2}</th><th class="px-2 py-4 text-center text-xs font-semibold">${panelText?.endDate}</th></tr></thead><tbody id="giveawaysHistoryTd"></tbody></table></div></div></div></div>`)
    ) // <p><a>${panelText?.settings_p2}: </a><a style="color: darkseagreen;" id="giveawayJoinsCount">0</a></p><a class="desc">${panelText?.settings_a2}</a>

    if(autoGiveawayConfig?.winNotification)
      $('#notificationSwitch').prop('checked', true);

    $('#notificationSwitch').on('change', async(e) => {
      const permission = await Notification.requestPermission();
      if(permission == "default") return await Notification.requestPermission();
      if(!permission || (permission == "denied" && e?.target?.checked)) return $('#notificationSwitch').prop('checked', false);

      const autoGiveawayConfigData = await getAutoGiveawayConfigData();
      if(!autoGiveawayConfigData) return;
      autoGiveawayConfigData.winNotification = e?.target?.checked;
      try { chrome.storage.sync.set({ autoGiveawayConfig: autoGiveawayConfigData }); } catch(e) {};
    });

    if(autoGiveawayConfig?.minPrice)
      $('#giveawayMinPrice').val(autoGiveawayConfig?.minPrice);

    $('#autoGiveawayButton').on('click', async() => {
      const autoGiveawayConfigData = await getAutoGiveawayConfigData();
      const checked = autoGiveawayConfigData?.active;
      $('#autoGiveawayButton').removeClass(checked ? 'button-primary' : 'button-light-green');
      $('#autoGiveawayButton').addClass(checked ? 'button-light-green' : 'button-primary');
      $('#autoGiveawayButton').text(checked ? panelText?.start : panelText?.disable);
      $('#giveawaySearch').css('display', checked ? 'none' : 'block');
      $('#main-view div.grid-stack.relative.grid.overflow-hidden').eq(4).css('display', checked ? 'block' : 'none')
      autoGiveawayConfigData.active = !autoGiveawayConfigData?.active;
      autoGiveawayConfigData.minPrice = $('#giveawayMinPrice')?.val();
      try { chrome.storage.sync.set({ autoGiveawayConfig: autoGiveawayConfigData }); } catch(e) {};
      createToast('info', checked ? 'autogiveaway_deactivate' : 'autogiveaway_active');
    });
    refreshGiveawaysPanel(panelText);
};

const refreshGiveawaysPanel = async(panelText) => {
  const config = await getConfigData();
  if(!config?.active) return;

  const index = await getIndexData();
  let giveawaysHistory = await getStorageData('local', 'giveawaysHistory');

  const userSkins = await getUserSkinsData(config?.token); 
  const giveawayWinnersTab = userSkins?.length !== 0 ? userSkins?.filter(el => el?.sourceType == 'giveaway') : [];
  
  let sumPrice = 0;
  if (giveawayWinnersTab != null && giveawayWinnersTab.length != 0)
    await giveawayWinnersTab.forEach(el => sumPrice += el?.price);
  const currency = await getCurrency();
  $('#giveawayMinPriceCurrency').text(` ${currency}`);
  const giveawayWinnersPrice = `${sumPrice?.toFixed(2)} ${currency || ''}`;
  const giveawayWinnersCount = giveawayWinnersTab?.length || 0;
  const currencyRates = index?.currencyRates;
  const currentRate = currencyRates?.filter(el => el?.id == currency)[0]?.rate || 1;

  let tableContent = '';
  if(giveawaysHistory?.length >= 1)
    giveawaysHistory.reverse();

  if(giveawaysHistory?.length >= 100) {
    giveawaysHistory = giveawaysHistory?.slice(1, 100);
    try { chrome.storage.local.set({ giveawaysHistory: giveawaysHistory }); } catch(e) {};
  }

  // let joinsCount = 20;
  let lastResetTime;
  const myDate = new Date();
  const resetDate = new Date();
  resetDate.setHours(2,0,0,0);
  
  if(myDate?.getTime() > resetDate?.getTime())
      lastResetTime = resetDate?.getTime();
    else {
      resetDate?.setDate(resetDate?.getDate() - 1);
      lastResetTime = resetDate?.getTime();
  }

  giveawaysHistory?.forEach(el => {
    let sumPrizesPrice = 0;
    el?.prizes?.forEach(e => sumPrizesPrice += e?.price);
    tableContent += `<tr class="odd:bg-navy-800"><td class="px-2 py-4 text-center"><a href='https://key-drop.com/giveaways/keydrop/${el?.id}'>${el?.Iwined ? '👑 ' : ''}${el?.id}</a></td><td class="px-2 py-4 text-center">(${el?.prizes?.length}) ${(sumPrizesPrice * currentRate).toFixed(2) || 0} ${currency || 'USD'}</td><td class="px-2 py-4 text-center">${el?.haveIJoined ? '✔️'  : el?.captcha ? 'reCAPTCHA' : '❌'}</td><td class="px-2 py-4 text-center">${new Date(el?.deadlineTimestamp).toLocaleString()}</td></tr>`;
    // if(el?.deadlineTimestamp > lastResetTime && el?.haveIJoined && joinsCount > 0)
    //  joinsCount--;
  });

  $('#giveawaysHistoryTd').html(tableContent || '');
  // $('#giveawayJoinsCount').html(joinsCount || '0')

  $('#giveawayWinnersPrice').text(giveawayWinnersPrice);
  $('#giveawayWinnersCount').text(giveawayWinnersCount);

  const autoGiveawayConfig = await getAutoGiveawayConfigData();
  /*if(joinsCount <= 0 && autoGiveawayConfig.active) {
    autoGiveawayConfig.active = false;
    createToast('info', 'autogiveaway_autoDeactivate');
    $('#autoGiveawayButton').addClass('button-light-green');
    $('#autoGiveawayButton').removeClass('button-primary');
    $('#autoGiveawayButton').text(panelText?.start);
    $('#giveawaySearch').css('display', 'none');
    $('#main-view div.grid-stack.relative.grid.overflow-hidden').eq(4).css('display', 'block');
    try { chrome.storage.sync.set({ autoGiveawayConfig: autoGiveawayConfig }); } catch(e) {};
  }*/

  if(autoGiveawayConfig?.active) {
    $('#autoGiveawayButton').removeClass('button-light-green');
    $('#autoGiveawayButton').addClass('button-primary');
    $('#autoGiveawayButton').text(panelText?.disable);
  }

  setTimeout(async() => {
    return refreshGiveawaysPanel(panelText);
  }, 60 * 1000);
};

waitForElm('#main-view div.grid-stack.relative.grid.overflow-hidden:nth-child(4)').then(() => {
    createCard();
});

waitForElm('#main-view div.min-h-screen.pb-16 div.container').then(() => {
  createGiveawayListPanel();
});

waitForElm('#main-view span.break-all').then(() => {
  $('.giveaway-keydropPlus-info').css('display', 'none');

  $(`a.button[href="${window?.location?.pathname?.slice(0, 4)}giveaways/"]`).on('click', async() => {
    try { window.open('https://key-drop.com/giveaways/list', '_self'); } catch(e) {};
  });
});