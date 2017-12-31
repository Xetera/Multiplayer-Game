function updateSpeedIcon(player){

    let upgrade = player['availableUpgrades']['speedUpgrades'];
    if (player.xSize > upgrade.cost && imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.removeClass('disabled');

    }
    else if ((player.xSize < upgrade.cost) && !imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.addClass('disabled')
    }
}

