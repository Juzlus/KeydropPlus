const createStatisticsPanel = async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);
    const server = await getServerData();
    if(!language || !server) return;

    const languagePanel = {
        title: language?.statistics_title,
        from: language?.statistics_from,
        to: language?.statistics_to,
        goldenCode: language?.statistics_goldenCode,
        goldFromCode: language?.statistics_goldFromCode,
        codeCount: language?.statistics_codeCount,
        depositMoney: language?.statistics_depositMoney,
        avg: language?.statistics_avg,
        depositCount: language?.statistics_depositCount,
        withdrawMoney: language?.statistics_withdrawMoney,
        withdrawCout: language?.statistics_withdrawCout,
        firstTransactionYear: language?.statistics_firstTransactionYear,
        transactionYear: language?.statistics_transactionYear,
        transactionCount: language?.statistics_transactionCount,
        skinsCount: language?.statistics_skinsCount,
        casesOpened: language?.statistics_casesOpened,
        giveawaysWon: language?.statistics_giveawaysWon,
        statusName: language?.statistics_statusName,
        count: language?.statistics_count,
        skinsSum: language?.statistics_skinsSum,
        skinsAVG: language?.statistics_skinsAVG,
        skinCheap: language?.statistics_skinCheap,
        skinExpensive: language?.statistics_skinExpensive,
        caseName: language?.statistics_caseName,
        openCount: language?.statistics_openCount,
        dropCheap: language?.statistics_dropCheap,
        dropExpensive: language?.statistics_dropExpensive,
        emptyResult: language?.statistics_emptyResult,
        new: language?.statistics_new,
        received: language?.statistics_received,
        sold: language?.statistics_sold,
        unknown: language?.statistics_unknown,
        upgrated: language?.statistics_upgrated,
        exchanged: language?.statistics_exchanged,
    };

    $('div.sticky.top-0.z-40.mx-auto.max-w-screen-xxl.p-0')
        ?.after($(document.createElement('table'))
            ?.addClass('container statistics_container')
            ?.css({ 'width': '100%', 'margin-top': '20px' })
            ?.html('<tbody id="statistics_caseInfoTable"></tbody>')
        )

        ?.after($(document.createElement('table'))
            ?.addClass('container statistics_container')
            ?.css({ 'width': '100%', 'margin-top': '20px' })
            ?.html('<tbody id="statistics_skinsStatusInfoTable"></tbody>')
        )

        ?.after($(document.createElement('div'))
            ?.addClass('container statistics_container')
            ?.css({ display: 'flex', 'justify-content': 'center' })
            ?.html(`<div style="width: 299px;height: 233px;overflow: hidden;background: url('${githubUrl}${server?.iconsPath}statistics_bg1.png?raw=true');margin: 10px;border-radius: 15px;box-shadow: 0px 0px 5px black;text-shadow: 0px 0px 10px black;"><abbr style="text-decoration: none;margin-top: 34px;display: inline-block;width: 100%;text-align: center;transform: rotate(-10deg);margin-bottom: 28px;" id="statistics_goldAmountAbbr"><h1 style="font-size: 63px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;margin-bottom: -14px;" id="statistics_goldAmount">0</h1><p class="mr-0 text-sm font-light text-white" style="font-size: 18px;">${languagePanel?.goldenCode}</p></abbr><div style="display: flex;margin: 0px 14px;justify-content: space-around;"><abbr style="text-decoration: none;text-align: center;" id="statistics_goldenCodeAmountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_goldenCodeAmount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.goldFromCode}</p></abbr><abbr style="text-decoration: none;text-align: center;" id="statistics_goldenCodeCountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_goldenCodeCount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.codeCount}</p></abbr></div></div><div style="width: 299px;overflow: hidden;height: 233px;margin: 10px;border-radius: 15px;background: url('${githubUrl}${server?.iconsPath}statistics_bg2.png?raw=true');box-shadow: 0px 0px 5px black;"><abbr style="text-decoration: none;margin-top: 34px;display: inline-block;width: 100%;text-align: center;transform: rotate(-10deg);margin-bottom: 28px;" id="statistics_depositAbbr"><h1 style="font-size: 63px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;margin-bottom: -14px;" id="statistics_deposit">0</h1><p class="mr-0 text-sm font-light text-white" style="font-size: 18px;">${languagePanel?.depositMoney}</p></abbr><div style="display: flex;margin: 0px 14px;justify-content: space-around;"><abbr style="text-decoration: none;text-align: center;" id="statistics_depositAVGAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_depositAVG">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.avg}</p></abbr><abbr style="text-decoration: none;text-align: center;" id="statistics_depositCoutAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_depositCout">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.depositCount}</p></abbr></div></div><div style="width: 299px;height: 233px;overflow: hidden;margin: 10px;border-radius: 15px;background: url('${githubUrl}${server?.iconsPath}statistics_bg3.png?raw=true');box-shadow: 0px 0px 5px black;"><abbr style="text-decoration: none;margin-top: 34px;display: inline-block;width: 100%;text-align: center;transform: rotate(-10deg);margin-bottom: 28px;" id="statistics_withdrawAbbr"><h1 style="font-size: 63px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;margin-bottom: -14px;" id="statistics_withdraw">0</h1><p class="mr-0 text-sm font-light text-white" style="font-size: 18px;">${languagePanel?.withdrawMoney}</p></abbr><div style="display: flex;margin: 0px 14px;justify-content: space-around;"><abbr style="text-decoration: none;text-align: center;" id="statistics_withdrawAVGAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_withdrawAVG">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.avg}</p></abbr><abbr style="text-decoration: none;text-align: center;" id="statistics_withdrawCountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_withdrawCount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.withdrawCout}</p></abbr></div></div><div style="width: 299px;height: 233px;overflow: hidden;background: url('${githubUrl}${server?.iconsPath}statistics_bg4.png?raw=true');margin: 10px;border-radius: 15px;box-shadow: 0px 0px 5px black;"><abbr style="text-decoration: none;margin-top: 34px;display: inline-block;width: 100%;text-align: center;transform: rotate(-10deg);margin-bottom: 28px;" id="statisctics_transactionYearAbbr"><h1 style="font-size: 63px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;margin-bottom: -14px;" id="statisctics_transactionYear">-</h1><p class="mr-0 text-sm font-light text-white" style="font-size: 18px;">${languagePanel?.firstTransactionYear}</p></abbr><div style="display: flex;margin: 0px 14px;justify-content: space-around;"><abbr style="text-decoration: none;text-align: center;" id="statisctics_transactionYearsCountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statisctics_transactionYearsCount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.transactionYear}</p></abbr><abbr style="text-decoration: none;text-align: center;" id="statisctics_transactionCountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statisctics_transactionCount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.transactionCount}</p></abbr></div></div><div style="width: 299px;height: 233px;margin: 10px;overflow: hidden;border-radius: 15px;background: url('${githubUrl}${server?.iconsPath}statistics_bg5.png?raw=true');box-shadow: 0px 0px 5px black;"><abbr style="text-decoration: none;margin-top: 34px;display: inline-block;width: 100%;text-align: center;transform: rotate(-10deg);margin-bottom: 28px;" id="statistics_allSkinsCountAbbr"><h1 style="font-size: 63px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;margin-bottom: -14px;" id="statistics_allSkinsCount">0</h1><p class="mr-0 text-sm font-light text-white" style="font-size: 18px;">${languagePanel?.skinsCount}</p></abbr><div style="display: flex;margin: 0px 14px;justify-content: space-around;"><abbr style="text-decoration: none;text-align: center;" id="statistics_allCaseSkinsCountAbbr"><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_allCaseSkinsCount">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.casesOpened}</p></abbr><abbr style="text-decoration: none;text-align: center;" id="statistics_giveawaysWinsAbbr" ><h4 style="font-size: 25px;color: white;font-family: 'Crisp Noto Sans Bold';letter-spacing: 2px;" id="statistics_giveawaysWins">0</h4><p class="mr-0 text-sm font-light text-white">${languagePanel?.giveawaysWon}</p></abbr></div></div>`)
        )

        ?.after($(document.createElement('div'))
            ?.addClass('container statistics_container')
            ?.html(`<div class="mb-10 grid grid-cols-1 border-grey-700 lg:grid-cols-3 lg:border-b"><h1 class="row-start-1 row-end-1 mt-10 ml-auto mr-auto -mb-px w-full border-b border-navy-100 pb-5 text-center text-lg uppercase lg:col-start-2 lg:col-end-2 lg:max-w-xs">${languagePanel?.title}</h1><div class="col-start-1 col-end-1 mt-px flex w-full justify-center self-end justify-self-center rounded-bl rounded-br bg-navy-500 py-3 md:col-start-3 md:col-end-3 md:mt-0 md:w-auto md:justify-self-end md:bg-transparent"><label>${languagePanel?.from}: <input type="datetime-local" id="statisctics_startTime" value="2010-01-01T00:00" min="2010-01-01T00:00" max="${new Date().toISOString()?.slice(0, 16)}"></label><label> ${languagePanel?.to}: <input type="datetime-local" id="statisctics_endTime" value="${new Date().toISOString()?.slice(0, 16)}" min="2010-01-01T00:00" max="${new Date().toISOString()?.slice(0, 16)}"></label></div></div>`)
        )
        ?.end();

        statisticsRefresh(languagePanel);
        $('#statisctics_startTime')?.on('change', function() {
            statisticsRefresh(languagePanel);
        });

        $('#statisctics_endTime')?.on('change', function() {
            statisticsRefresh(languagePanel);
        });
};

const statisticsRefresh = async(lang) => {
    let startTime = new Date($('#statisctics_startTime')?.val())?.getTime() || 0;
    let endTime = new Date($('#statisctics_endTime')?.val())?.getTime() || 0;
    getTransactionHistory(startTime, endTime, lang)
    getDepositHistory(startTime, endTime, lang);
    getCasesInfo(startTime, endTime, lang);
};

const getTransactionHistory = async(startTime, endTime, lang) => {
    const fetch = await fetchUrl('GET', 'https://key-drop.com/pl/apiData/AccountHistory/transaction?perPage=999999&page=0');
    if(!fetch || !fetch?.data) return;

    let goldAmount = 0;
    let goldenCodeAmount = 0;
    let goldenCodeCount = 0;
    let allTransaction = 0;

    const startDate = new Date(fetch?.data[fetch?.data?.length-1]?.createAt);
    const startDateSliced = startDate.toISOString()?.slice(0, 16);
    $('#statisctics_transactionYear')?.text(startDate?.getFullYear() || '-');
    $('#statisctics_transactionYearAbbr')?.attr('title', startDate?.getFullYear() || '-');
    $('#statisctics_transactionYearsCount')?.text((Math.abs(new Date(Date.now() - startDate?.getTime()).getUTCFullYear() - 1970)) || 0);
    $('#statisctics_transactionYearsCountAbbr')?.attr('title', (Math.abs(new Date(Date.now() - startDate?.getTime()).getUTCFullYear() - 1970)) || 0);
    $('#statisctics_startTime')?.attr({ min: startDateSliced, value: startDateSliced });
    $('#statisctics_endTime')?.attr({ min: startDateSliced });

    fetch?.data?.forEach(el => {
        const elTime = new Date(el?.createAt)?.getTime();
        if(startTime && elTime)
            if(elTime < startTime)
                return;
        if(endTime && elTime)
            if(elTime > endTime)
                return;
        allTransaction++;
        if(el?.type == "gold") {
            amount = parseFloat(el?.amount);
            if(amount <= 0 ) return;
            goldAmount += amount;
            const args = el?.description?.split(' ');
            if(args[args?.length - 1]?.length >= 17) {
                goldenCodeAmount += amount;
                goldenCodeCount++;
            }
        }
    });

    $('#statisctics_transactionCount')?.text(allTransaction || 0);
    $('#statisctics_transactionCountAbbr')?.attr('title', allTransaction || 0);

    $('#statistics_goldenCodeCount').text(goldenCodeCount);
    $('#statistics_goldenCodeCountAbbr').attr('title', goldenCodeCount);

    $('#statistics_goldenCodeAmount').text(goldenCodeAmount?.toFixed(0));
    $('#statistics_goldenCodeAmountAbbr').attr('title', goldenCodeAmount?.toFixed(0));

    $('#statistics_goldAmount').text(goldAmount?.toFixed(0));
    $('#statistics_goldAmountAbbr').attr('title', goldAmount?.toFixed(0));
};

const getDepositHistory = async(startTime, endTime, lang) => {
    const fetch = await fetchUrl('GET', 'https://key-drop.com/pl/apiData/AccountHistory/deposit?perPage=999999&page=0');
    if(!fetch || !fetch?.data) return;

    let amount = 0;
    let count = 0;
    fetch?.data?.forEach(el => {
        const elTime = new Date(el?.date)?.getTime();
        if(startTime && elTime)
            if(elTime < startTime)
                return;
        if(endTime && elTime)
            if(elTime > endTime)
                return;
        amount += el?.amount;
        count++;
    });

    $('#statistics_depositCout').text(count);
    $('#statistics_depositCoutAbbr').attr('title', count);

    $('#statistics_depositAVG').text(amount == 0 ? 0 : (amount/count)?.toFixed(2));
    $('#statistics_depositAVGAbbr').attr('title', amount == 0 ? 0 : (amount/count)?.toFixed(2));

    $('#statistics_deposit').text(amount == 0 ? 0 : amount?.toFixed(2));
    $('#statistics_depositAbbr').attr('title', amount == 0 ? 0 : amount?.toFixed(2));
};

const getCasesInfo = async(startTime, endTime, lang) => {
    const config = await getConfigData();
    const allUserSkins = await getUserSkinsData(config);

    const nullContent = `<tr style="text-align: center"><td class="fullTd" colspan="6">${lang?.emptyResult}</td></tr>`;
    let tableContent = `<tr><th>${lang?.caseName}</th><th>${lang?.openCount}</th><th>${lang?.skinsSum}</th><th>${lang?.skinsAVG}</th><th>${lang?.dropCheap}</th><th>${lang?.dropExpensive}</th></tr>`;
    let tableContent2 = `<tr><th>${lang?.statusName}</th><th>${lang?.count}</th><th>${lang?.skinsSum}</th><th>${lang?.skinsAVG}</th><th>${lang?.skinCheap}</th><th>${lang?.skinExpensive}</th></tr>`;

    if(!config || !allUserSkins || !allUserSkins?.length) {
        tableContent += nullContent;
        tableContent2 += nullContent;
        $('#statistics_caseInfoTable')?.html(tableContent);
        $('#statistics_skinsStatusInfoTable')?.html(tableContent2);
    }

    let giveawaysWins = 0;
    let allSkinsCount = 0
    let allCaseSkinsCount = 0;
    let withdrawPrice = 0;
    let withdrawCout = 0;
    let casesInfo = {}; 
    let skinStatusInfo = {}; 
    allUserSkins?.forEach(el => {
        const elTime = new Date(el?.createdAt)?.getTime();
        if(startTime && elTime)
            if(elTime < startTime)
                return;
        if(endTime && elTime)
            if(elTime > endTime)
                return;
    
        if(el?.sourceName == "OTHER")
            el.sourceName = (el?.sourceType)?.toUpperCase();
        else if(el?.sourceName !== "CONTRACT" && el?.sourceName !=+ "EVENT")
            allCaseSkinsCount++;
        if(el?.sourceName == "GIVEAWAY")
            giveawaysWins++;
        allSkinsCount++;

        if(el?.color == "blue")
            el.color = 'cornflowerblue';

        const caseData = {
            sourceName: el?.sourceName,
            currency: el?.currency,
            link: el?.sourceLink,
            openCount: 1,
            priceSum: el?.price,
            skins: [
                {
                    name: el?.name?.replace('Factory New', 'FN')
                        ?.replace('Minimal Wear', 'MN')
                        ?.replace('Field-Tested', 'FT')
                        ?.replace('Well-Worn', 'WW')
                        ?.replace('Battle-Scarred', 'BS'),
                    price: el?.price,
                    color: el?.color,
                    sourceType: el?.sourceType,
                }
            ]
        };

        if(casesInfo[el?.sourceName]) {
            casesInfo[el?.sourceName].openCount = (casesInfo[el?.sourceName]?.openCount || 0) + 1;
            casesInfo[el?.sourceName].priceSum = (casesInfo[el?.sourceName]?.priceSum || 0) + el?.price;
            casesInfo[el?.sourceName].skins.push({
                name: el?.name?.replace('Factory New', 'FN')
                    ?.replace('Minimal Wear', 'MN')
                    ?.replace('Field-Tested', 'FT')
                    ?.replace('Well-Worn', 'WW')
                    ?.replace('Battle-Scarred', 'BS'),
                price: el?.price,
                color: el?.color,
                sourceType: el?.sourceType,
            });
        } else
            casesInfo[el?.sourceName] = caseData;

        const skinStatusData = {
            status: el?.status,
            currency: el?.currency,
            count: 1,
            priceSum: el?.price,
            skins: [
                {
                    name: el?.name?.replace('Factory New', 'FN')
                        ?.replace('Minimal Wear', 'MN')
                        ?.replace('Field-Tested', 'FT')
                        ?.replace('Well-Worn', 'WW')
                        ?.replace('Battle-Scarred', 'BS'),
                    price: el?.price,
                    color: el?.color,
                    sourceType: el?.sourceType,
                    upgrade: el?.upgrade, 
                }
            ]
        }

        if(skinStatusInfo[el?.status]) {
            skinStatusInfo[el?.status].count = (skinStatusInfo[el?.status]?.count || 0) + 1;
            skinStatusInfo[el?.status].priceSum = (skinStatusInfo[el?.status]?.priceSum || 0) + el?.price;
            skinStatusInfo[el?.status].skins.push({
                name: el?.name?.replace('Factory New', 'FN')
                    ?.replace('Minimal Wear', 'MN')
                    ?.replace('Field-Tested', 'FT')
                    ?.replace('Well-Worn', 'WW')
                    ?.replace('Battle-Scarred', 'BS'),
                price: el?.price,
                color: el?.color,
                sourceType: el?.sourceType,
                upgrade: el?.upgrade, 
            });
        } else
            skinStatusInfo[el?.status] = skinStatusData;

        if(el?.status == 1) {
            withdrawPrice += el?.price;
            withdrawCout++;
        }
    });

    let caseInfoSorted = $.map(casesInfo, function(value, index) { return [value]; });
    caseInfoSorted?.sort((a, b) => b?.openCount - a?.openCount);
    for(i = 0; i < caseInfoSorted?.length; i++) {
        const skins = caseInfoSorted[i]?.skins;
        skins?.sort((a, b) => a?.price - b?.price);

        tableContent += `<tr>
        <td class="firstTd"><a target="_blank" href="${caseInfoSorted[i]?.link}">${caseInfoSorted[i]?.sourceName}</a></td>
        <td>${caseInfoSorted[i]?.openCount}</td>
        <td>${caseInfoSorted[i]?.priceSum?.toFixed(2)} ${caseInfoSorted[i]?.currency}</td>
        <td>${(caseInfoSorted[i]?.priceSum / caseInfoSorted[i]?.openCount)?.toFixed(2)} ${caseInfoSorted[i]?.currency}</td>
        <td><a style="filter: brightness(0.8); color: ${skins[0]?.color}">${skins[0]?.name} | ${skins[0]?.price?.toFixed(2)} ${caseInfoSorted[i]?.currency}</a></td>
        <td class="lastTd"><a style="filter: brightness(0.8); color: ${skins[skins?.length-1]?.color}">${skins[skins?.length-1]?.name} | ${skins[skins?.length-1]?.price?.toFixed(2)} ${caseInfoSorted[i]?.currency}</a></td>
        </tr>`;
    }

    let skinsStatusInfoSorted = $.map(skinStatusInfo, function(value, index) { return [value]; });
    skinsStatusInfoSorted?.sort((a, b) => b?.count - a?.count);
    for(i = 0; i < skinsStatusInfoSorted?.length; i++) {
        const skins = skinsStatusInfoSorted[i]?.skins;
        skins?.sort((a, b) => a?.price - b?.price);

        let status = "";
        switch(skinsStatusInfoSorted[i]?.status) {
            case '0':
                status = lang?.new;
                break;
            case '1':
                status = lang?.received;
                break;
            case '2':
                status = lang?.sold;
                break;
            case '3':
                status = lang?.unknown;
                break;
            case '4':
                status = lang?.upgrated;
                break;
            case '5':
                status = lang?.unknown; 
                break;
            case '6':
                status = lang?.unknown;
                break;
            case '7':
                status = lang?.exchanged;
                break;
            case '8':
                status = lang?.unknown;
                break;
        };

        const avg = skinsStatusInfoSorted[i]?.priceSum / skinsStatusInfoSorted[i]?.count || 0;

        tableContent2 += `<tr>
        <td class="firstTd">${status}</td>
        <td>${skinsStatusInfoSorted[i]?.count}</td>
        <td>${skinsStatusInfoSorted[i]?.priceSum?.toFixed(2)} ${skinsStatusInfoSorted[i]?.currency}</td>
        <td>${avg?.toFixed(2)} ${skinsStatusInfoSorted[i]?.currency}</td>
        <td><a style="filter: brightness(0.8); color: ${skins[0]?.color}">${skins[0]?.name} | ${skins[0]?.price?.toFixed(2)} ${skinsStatusInfoSorted[i]?.currency}</a></td>
        <td class="lastTd"><a style="filter: brightness(0.8); color: ${skins[skins?.length-1]?.color}">${skins[skins?.length-1]?.name} | ${skins[skins?.length-1]?.price?.toFixed(2)} ${skinsStatusInfoSorted[i]?.currency}</a></td>
        </tr>`;
    }

    if(!caseInfoSorted?.length)
        tableContent += nullContent;
    if(!skinsStatusInfoSorted?.length)
        tableContent2 += nullContent;

    $('#statistics_caseInfoTable')?.html(tableContent);
    $('#statistics_skinsStatusInfoTable')?.html(tableContent2);

    $('#statistics_withdraw')?.text(withdrawPrice == 0 ? 0 : withdrawPrice?.toFixed(2));
    $('#statistics_withdrawAbbr')?.attr('title', withdrawPrice == 0 ? 0 : withdrawPrice?.toFixed(2));

    $('#statistics_withdrawAVG')?.text(withdrawCout == 0 ? 0 : (withdrawPrice / withdrawCout)?.toFixed(2));
    $('#statistics_withdrawAVGAbbr')?.attr('title', withdrawCout == 0 ? 0 : (withdrawPrice / withdrawCout)?.toFixed(2));

    $('#statistics_withdrawCount')?.text(withdrawCout);
    $('#statistics_withdrawCountAbbr')?.attr('title', withdrawCout);

    $('#statistics_allSkinsCount')?.text(allSkinsCount);
    $('#statistics_allSkinsCountAbbr')?.attr('title', allSkinsCount);

    $('#statistics_allCaseSkinsCount')?.text(allCaseSkinsCount);
    $('#statistics_allCaseSkinsCountAbbr')?.attr('title', allCaseSkinsCount);

    $('#statistics_giveawaysWins')?.text(giveawaysWins);
    $('#statistics_giveawaysWinsAbbr')?.attr('title', giveawaysWins);
};

waitForElm('div.sticky.top-0.z-40.mx-auto.max-w-screen-xxl.p-0').then(() => {
    createStatisticsPanel();
});