// use-referral-codes.js
import useSWR from 'swr'

const endpoint = 'https://invitation.codes/api/ext/v1/sites.json'

export const useReferralCodes = () => {
  const { data, error } = useSWR(endpoint, (url) => {
    return fetch(url).then((response) => response.json())
  })

  return { data, error, isLoading: !data && !error }
}