import request from '@/utils/request'
import { getUser } from '@/utils/auth'
export function getSideBar() {
    return new Promise(function(resolve, reject) {
        request.get('/uaa/sys/getWebMenusByUserCode?userCode=' + userInfo().uaaid).then((res) => {
            resolve(res)
        }).catch(function(error) {
            reject(error)
        });
    })
}
export function loadMenus(zoneCode) {
    return request({
        method: 'get',
        url: '/uaa/zone/getZoneActiveBuildInPermissions?zoneCode=' + zoneCode
    })
}