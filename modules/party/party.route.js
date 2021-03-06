import * as partyC from "./party.controll"
export const partyRouter = router => {
  router.post(`/add/party`, partyC.addParty)
  router.get(`/list/party`, partyC.getPartyList)
  router.get(`/all/list`, partyC.allList)
  return router
}
