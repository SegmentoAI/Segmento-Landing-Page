import { AlertCircleIcon, ShieldIcon, BarChart2Icon } from "lucide-react";
export const ExamplesSection = () => {
  return (
    <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Real-World Examples
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            See how Segmento solves critical problems for protocols in the real
            world.
          </p>
        </div>
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 md:mb-0 md:mr-6">
                <ShieldIcon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Single KOL Marketing Report
                </h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Sources:</span>{" "}
                  <a href="/KOL-report-example" className="underline">
                    Example report
                  </a>
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">What happened:</span> You are trying to find partnerships
                   and getting refused because there is no way to prove the value you deliver.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> You are a legit, hard-working KOL, reaching
                   out to protocols to find partnerships. You do not have a way to prove the value you provide
                   to your partners, resulting in a low success rate. You are being bundled together with all
                   the follower farms and it drags you down.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">How Segmento helps:</span>{" "}
                  Segmento is able to provide third-party proof that you are delivering high-quality results,
                  together with precise numbers. Show the net worth of users that you brought to given protocols,
                  their trading volumes, or whether they immediately dump their airdrops or not.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-6 md:mb-0 md:mr-6">
                <BarChart2Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Leverage Your KOLs - Identify the Most Valuable Influencers
                </h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">What happened:</span> Protocol launched marketing
                  campaign and referral program. The program was successful but also costly.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> The protocol is growing but is not able to
                  afford the same marketing budget in the future. The protocol needs to optimize
                  who they reward to maximize growth with reasonable cost.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">How Segmento helps:</span> Based on referral data,
                  Segmento provides information about the value that each KOL brings to the protocol.
                  Segmento not only tracks the direct value from realized referrals but also the
                  overall value of the users reffered by the KOL over time. Imagine KOL A brings
                  100 users that each spends $10 on the protocol and additional $10 elsewhere,
                  while KOL B brings 50 users that each spends $10 on the protocol and $100 elsewhere.
                  KOL B brought more valuable users even though the direct referrals were lower.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-6 md:mb-0 md:mr-6">
                <AlertCircleIcon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Protection Against Airdrop Farmers
                </h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">What happened:</span> Airdrop
                  farmers flooded a protocol, causing TVL and activity to go up
                  with a goal to dump after airdrop.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> Genuine users,
                  long-term capital and users that intended to hold the token for a long time
                  were hurt by the drop of the price caused by airdrop farmers.
                  Causing the genuine users and long term token holders to leave early
                  since they wanted to protect what was left.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">How Segmento helps:</span> By
                  identifying the Airdrop Farmers and "early token sellers",
                  Segmento would suggest to the team to decrease the allocation
                  of points and airdrop to the users identified as Airdrop Farmers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 text-yellow-600 mb-6 md:mb-0 md:mr-6">
                <BarChart2Icon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Know Your Users - What Do They Do in Other Protocols?
                </h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">What happened:</span> Segmento identified
                  that protocol's users have much more assets on other platforms and that they
                  started to move their assets.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> The cost of acquiring new liquidity
                  from existing users is much lower than acquiring new users.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">How Segmento helps:</span> Segmento provides
                  information about the users' holdings and activity on other platforms,
                  allowing the protocol to create targeted campaigns to incentivize those users
                  to bring their assets to the protocol. Decreasing the cost of acquisition.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6 md:mb-0 md:mr-6">
                <ShieldIcon className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Understand the Needs of Your Users - What Do They Optimize For?
                </h3>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">What happened:</span> Analytics
                  showed protocol users became much more sensitive to fees on other platforms.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> There is an opportunity
                  in the market to acquire the fee sensitive users.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">Impact:</span> Without
                  intervention, the protocol users might leave for other platforms with lower fees.
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-medium">How Segmento helps:</span> By
                  flagging the sensitivity of users to fees, Segmento allows teams to
                  acquire new users from competitors and create targeted campaigns and
                  incentives to retain existing users and reduce churn.
                </p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
