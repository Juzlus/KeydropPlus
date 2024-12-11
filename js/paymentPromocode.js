$( document ).ready(async() => {
    const config = await getConfigData();
    if(!config || !config?.active) return;
    const language = await getLanguageData(config?.lang);

    setTimeout(async() => {
        $('[data-testid="refill-deposit-btn"]')?.on('click', async() => {
            waitForElm('[data-testid="deposit-modal-promocode-edit-btn"]').then(()=>{
                createPromocodeButton(language?.paymentPromocode_useCode, true);
            });
        });
    }, 500);
    
    if(window?.location?.href?.includes('/#/payment/'))
        createPromocodeButton(language?.paymentPromocode_useCode, true);
});

const createPromocodeButton = async(lnagText, isFirst) => {
    if(isFirst)
        waitForElm('[data-testid="deposit-modal-promocode-edit-btn"]').then(() => {
            const panel = document?.querySelector('[data-reach-dialog-content] .grid-stack.grid.h-full');
            const observer = new MutationObserver(async() => createPromocodeButton(lnagText, false));
            if (panel instanceof Node) {
                observer.observe(panel, { attributes: true, childList: true });
            }
            createPromocodeButton(lnagText, false);
        });
    else {
        $('[data-testid="deposit-modal-promocode-edit-btn"]')?.on('click', async() => {
            waitForElm('[data-testid="deposit-modal-promocode-container"]').then(() => {

                $('[data-reach-dialog-content] div.flex.justify-between button')?.on('click', async() => {
                    waitForElm('[data-testid="deposit-modal-promocode-edit-btn"]').then(()=>{
                        createPromocodeButton(lnagText, false);
                    });
                });
                
                if (!$('.juzlus-promocode')?.length)
                    $('[data-testid="deposit-modal-submit-promocode"]')?.eq(0)?.after($(document.createElement('button'))
                        ?.addClass('button juzlus-promocode button-light-green -ml-8 h-15 text-green-300 disabled:opacity-75 sm:min-w-[120px]')
                        ?.css({ 'cursor': 'pointer', 'user-select': 'none', 'margin-left': '-10px' })
                        ?.html(`<span>${lnagText}<br>JUZLUS</span>`)
                        ?.on('click', async() => {
                            await fetchUrl('POST', 'https://key-drop.com/en/apiData/Bonus/promocode_activation_code', false, false, { promoCode: 'JUZLUS' });
                            window?.location?.reload();
                        })
                    );
                $('strong.text-green').eq(0).text("JUZLUS");
            });
        });
    }
};