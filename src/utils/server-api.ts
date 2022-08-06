import axios from 'axios';

export const updateUserCount = (serverHost: URL, userName: string, successCount: number) => {
    axios.post(serverHost + "update_user_leaderboard", {
        userName,
        successCount
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        console.log(`${userName} update res`, res);
    }).catch((err) => {
        console.log(`${userName} update error`, err);
    })
}