waitForElm(`a.button[href="${window?.location?.pathname?.slice(0, 4)}giveaways/"]`).then(() => {
    $(`a.button[href="${window?.location?.pathname?.slice(0, 4)}giveaways/"]`).on('click', async() => {
        try { window.open('https://key-drop.com/giveaways/list', '_self'); } catch(e) {};
    });
});