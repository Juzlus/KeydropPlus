$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);

    const paymentFetch = await fetchUrl('GET', 'https://key-drop.com/en/apiData/PaymentModal?option=payment');
    const paymentModalFetch = await fetchUrl('GET', `https://key-drop.com/lang/paymentModal/${(await getCookieValue('key-lang'))?.toLowerCase()}.json`);
    const depositFetch = await fetchUrl('GET', `https://key-drop.com/en/apiData/AccountHistory/deposit?perPage=1&page=0`);
    if (!paymentFetch || !paymentModalFetch || !depositFetch) return;
    
    paymentModal = JSON.parse(JSON.stringify(paymentModalFetch));
    payment = JSON.parse(JSON.stringify(paymentFetch));
    deposit = JSON.parse(JSON.stringify(depositFetch));
    if(!payment || !paymentModal || !deposit) return;

    const languageText = {
        lastDeposit: language?.disclosurePanels_lastDeposit,
        never: language?.disclosurePanels_never,
    };

    const addInfo = async(first=false) => {
        waitForElm('div[data-testid="code-modal"] span[data-testid="coupon_modal_exclamation_icon"]').then(async()=>{
            if ($('.disclosurePanels-keydropPlus')?.length) return;
            if(first)
                $('button[data-testid="nav_button"]').on('click', async(e) => {
                    setTimeout(() => {
                        $('.disclosurePanels-keydropPlus').remove();
                        addInfo();
                    }, 100 );
                });
            const panel = $('div[data-testid="code-modal"]');

            panel.find('span.font-semibold.text-green-400')
            .after($(document.createElement('div'))
                .addClass('disclosurePanels-keydropPlus')
                .html(`${paymentModal?.currentCode.slice(0, 1)}${paymentModal?.currentCode.slice(1).toLowerCase()}: <a class="font-semibold text-green-400">${payment?.init?.promoCode || '-'}</a>`)
            );
            
            panel.find('span.font-semibold.text-gold')
            .after($(document.createElement('div'))
                .addClass('disclosurePanels-keydropPlus')
                .html(`${languageText?.lastDeposit}: <a class="font-semibold text-gold">${deposit?.data[0]?.date || languageText?.never}</a>`)
            );
        });
    }
    
    $('button[data-testid="use-code-header-btn"]').on('click', async(e) => {
        addInfo(true);
    });

    addInfo(true);
});