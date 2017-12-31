function updateSpeedIcon(player){

    let upgrade = player['availableUpgrades']['speedUpgrades'];
    if (player.size > upgrade.cost && imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.removeClass('disabled');

    }
    else if ((player.size < upgrade.cost) && !imgSpeedUpgrade.hasClass('disabled')){
        imgSpeedUpgrade.addClass('disabled')
    }
}

function updateStats(player){
    speedStatText.html(Math.floor(player.xSpeedDelta));
    minSizeValue.html(player.minSize);
    maxSizeValue.html(player.maxSize);
    score.html(player.score);

}
