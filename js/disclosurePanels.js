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

    waitForElm('button.button.group.relative.h-full.overflow-hidden').then(async()=>{
        $('button.button.group.relative.h-full.overflow-hidden').eq(0).on('click', async() => {
            waitForElm('.group.relative.flex.h-full.cursor-pointer.items-center.overflow-hidden.rounded-bl-lg.border.border-gold-850').then(async()=>{
                if($('.keydrop-plus-usecode-info').length) return;

                const panel = $('div.absolute.flex.rounded-b-2xl.border-t');
                const useCode = panel.find('span.whitespace-nowrap.font-bold.uppercase').eq(2).text();

                panel.find('button div.flex.items-center').css('margin-top', '-10px')
                .after($(document.createElement('div'))
                    .addClass('whitespace-nowrap text-2xs font-bold uppercase lg:text-[4px]')
                    .css({ color: 'rgb(146 255 177)', position: 'absolute', bottom: 0, background: '#0000003d', width: '100%', 'text-align': 'center', height: '20px', 'padding-top': '4px' })
                    .text(`${paymentModal?.currentCode}: ${payment?.init?.promoCode || '-'}`)
                );

                const depositText = `${languageText?.lastDeposit}: ${deposit?.data[0]?.date || languageText?.never}`;
                panel.find('button')
                .after($(document.createElement('button'))
                    .addClass('group relative w-full cursor-pointer overflow-hidden rounded-b-lg border keydrop-plus-usecode-info')
                    .css({ background: '#ffff0026', 'border-color': 'rgb(255 248 146)' })
                    .html(`<div class="flex items-center justify-center bg-gradient-to-l f border-gold-850 bg-[length:100%_100%] px-8 py-4 text-[#92FFB1] transition-all duration-200 ease-out hover:bg-[length:200%_200%] lg:px-10 lg:py-5" style="margin-top: -10px;"><svg class="mr-2 h-5 w-5" style="color: rgb(255 248 146);"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?51#keyboard"></use></svg><span class="whitespace-nowrap text-2xs font-bold uppercase lg:text-[11px]" style="color: rgb(255 248 146);">${useCode}</span><svg class="absolute -left-2 top-0.5 h-18 w-18 rotate-[15deg] text-green/10 transition-transform duration-200 ease-out group-hover:scale-150 group-hover:duration-[400ms] group-hover:ease-[cubic-bezier(0.03,0.69,0.15,0.86)]"><use xlink:href="https://key-drop.com/web/KD/static/icons.svg?51#keyboard"></use></svg></div><div class="whitespace-nowrap text-2xs font-bold uppercase lg:text-[4px]" style="color: rgb(255 248 146); position: absolute; bottom: 0; background: #0000003d; width: 100%; text-align: center; height: 20px; padding-top: 4px;">${depositText}</div>`)
                    .click(function (e) { 
                        $('button.flex.items-center.justify-center.p-3.px-6.absolute.bottom-5.right-5').eq(2).click();
                    })
                );
            });
        });
    });
});