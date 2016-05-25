/**
 * Created by vince on 5/25/2016.
 */
function decideAward(awardMsg) {
    switch (awardMsg) {
        case 0:
            return "award1";
            break;
        case 1:
            return "award2";
            break;
        default:
            return "award3";
    }
}

function decideDiffculty(level) {
    switch (level) {
        case 0:
            return "hard";
            break;
        case 1:
            return "med";
            break;
        default:
            return "easy";
    }
}