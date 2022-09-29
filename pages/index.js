import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/future/image';
import DetailCard from '../components/DetailCard';
// import BarCharts from '../components/BarCharts';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import trendsData from '../data/Data_GT.json';
import trendsDataSDGs from '../data/Data_SDGs.json';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import SectorDropDown from '../components/SectorDropDown';
import SectorButton from '../components/SectorButton';
import heroImg from '../public/hero.jpg'

const BarCharts = dynamic(() => import('../components/BarCharts'), {
  ssr: false,
});

export default function Home() {
  const positiveSectorTrendSorted = Object.keys(trendsData)
    .filter((sector) => trendsData[sector]['combined_trends_mean_change'] > 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[a]['combined_trends_mean_change'] -
          trendsData[b]['combined_trends_mean_change']
        )
    );

  const positiveSectorTrendSortedData = positiveSectorTrendSorted.map(
    (sector) => trendsData[sector]['combined_trends_mean_change']
  );

  const negativeSectorTrendSorted = Object.keys(trendsData)
    .filter((sector) => trendsData[sector]['combined_trends_mean_change'] < 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[a]['combined_trends_mean_change'] -
          trendsData[b]['combined_trends_mean_change']
        )
    );

  const negativeSectorTrendSortedData = negativeSectorTrendSorted.map(
    (sector) => trendsData[sector]['combined_trends_mean_change']
  );

  const trendsDataSorted = Object.keys(trendsData).sort(
    (a, b) =>
      -(
        trendsData[a]['combined_trends_mean_change'] -
        trendsData[b]['combined_trends_mean_change']
      )
  );
  const trendsDataSDGsSorted = Object.keys(trendsDataSDGs).sort(
    (a, b) =>
      -(
        trendsDataSDGs[a]['combined_trends_mean_change'] -
        trendsDataSDGs[b]['combined_trends_mean_change']
      )
  );

  const getDateOfWeek = (w, y) => (new Date(y, 0, (1 + (w - 1) * 7)))

  const latestDate = getDateOfWeek(Object.keys(trendsData[Object.keys(trendsData)[0]]["biannually_combined_trends_mean"]["2022"]).length, 2022)

  return (
    // <div>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <h1>Hello World</h1>
    // </div>
    <div className="min-h-screen bg-white">
      {/* <SectorDropDown /> */}
      {/* <Navbar /> */}
      <div className="flex-1 max-w-7xl mx-auto p-10">
        {/* <section className="my-16">
          <h1 className="text-black text-[1.5rem] font-bold text-center max-w-2xl m-auto">
            Ingin mengetahui topik apa yang banyak ditelusuri masyarakat pada
            google pada setiap sektor? Yuk cari!
          </h1>
          <SearchBar />
        </section>
        <section className="my-16">
          <h1 className="text-black text-[1.5rem] font-bold text-center max-w-2xl m-auto">
            Topik Trending
          </h1>
          <div className="flex flex-wrap justify-center">
            {Object.keys(trendsData).map((sector, index) => {
                return (
                  <>
                    <SectorButton
                      href={`/sector/${sector}`}
                      name={`${trendsData[sector]["name"]}`}
                    />
                  </>
                );
              })}
          </div>
        </section> */}

        <section className="h-[50vh] my-[25vh] relative">
          <div className="absolute z-[1] w-[50%] top-1/2 translate-y-[-50%]">
            <h1 className="text-[#07B0F8] text-[3rem] font-bold drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
              UNITREND by Institute for Policy Development
            </h1>
            <p className="text-[#07B0F8] text-[1.5rem] my-2 drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
              Presenting Data for Better Policy
            </p>
          </div>
          <Image src={heroImg} alt="Futuristic city" className='w-[40vw] absolute right-0 top-2/4 translate-y-[-50%] h-[auto] contrast-[110%] brightness-[70%] saturate-0'></Image>
        </section>
        <section className="text-justify my-16">
          <h1 className="text-black text-[2rem] font-bold">
            Sektor mana saja yang mengalami peningkatan pencarian di Google?
          </h1>
          <p className="text-black text-[1.1rem] my-2">
            Data berikut ini menunjukkan sektor-sektor yang mengalami peningkatan persentase pencarian, dibandingkan dengan periode yang sama pada tahun sebelumnya. Hal ini menunjukkan adanya traksi yang tinggi terhadap topik sektor berikut di Google.
          </p>
          <p className="text-gray-400 text-[0.875rem]">
            Data terakhir diambil : {latestDate.toISOString().slice(0, 10)}
          </p>
          <BarCharts
            sector={positiveSectorTrendSorted.map(
              (sector) => trendsData[sector]['name']
            )}
            series={positiveSectorTrendSortedData}
            fillColor="#07B0F8"
          />
        </section>
        <section className="text-justify my-16">
          <h1 className="text-black text-[2rem] font-bold">
            Sektor apa saja yang mengalami penurunan pencarian di Google?
          </h1>
          <p className="text-black text-[1.1rem] my-2">
            Data berikut ini menunjukkan sektor-sektor yang mengalami penurunan persentase, dibandingkan periode yang sama pada tahun sebelumnya. Diketahui bahwa terjadi penurunan yang signifikan terhadap pencarian topik yang berhubungan dengan sektor berikut di Google.
          </p>
          <p className="text-gray-400 text-[0.875rem]">
            Data terakhir diambil : {latestDate.toISOString().slice(0, 10)}
          </p>
            <BarCharts
              sector={negativeSectorTrendSorted.map(
                (sector) => trendsData[sector]['name']
              )}
              series={negativeSectorTrendSortedData}
              fillColor="#F84F07"
            />
        </section>
        <h1 className="text-black text-[1.5rem] font-semibold">
          Klik  untuk  mengetahui  rincian  data masing-masing sektor
        </h1>
        <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trendsDataSorted.map((k, index) => {
            return (
              <>
                <li key={index}>
                  <DetailCard
                    href={`/sector/${encodeURIComponent(k)}`}
                    sector={trendsData[k]['name']}
                    trendsChange={trendsData[k]['combined_trends_mean_change']}
                  />
                </li>
              </>
            );
          })}
          {/* <li>
            <DetailCard sector = "India"/>
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li>
          <li>
            <DetailCard />
          </li> */}
        </ul>
        <section className="text-justify my-16">
          <h1 className="text-black text-[2rem] font-bold"><i>Sustainable Development Goals</i></h1>
          <p className="text-black text-[1.1rem] my-2">
          SDGs (<i>Sustainable Development Goals</i>) adalah agenda 2030 yang merupakan kesepakatan pembangunan berkelanjutan berdasarkan hak asasi manusia dan kesetaraan. Poin umum dari pembangunan berkelanjutan, digunakan sebagai pedoman untuk melaksanakan pembangunan yang menjaga peningkatan kesejahteraan ekonomi masyarakat secara berkesinambungan, pembangunan yang menjaga keberlanjutan kehidupan sosial masyarakat, pembangunan yang menjaga kualitas lingkungan hidup serta pembangunan yang menjamin keadilan dan terlaksananya tata kelola yang mampu menjaga peningkatan kualitas hidup dari satu generasi ke generasi berikutnya. PolDev Data Center menyajikan keyword-keyword yang berelevansi tinggi terhadap beberapa poin SDGs.
            </p>
          <ul className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {trendsDataSDGsSorted.map((k, index) => {
              return (
                <>
                  <li key={index}>
                    <DetailCard
                      href={`/sdgs/${encodeURIComponent(k)}`}
                      sector={trendsDataSDGs[k]['name']}
                      trendsChange={
                        trendsDataSDGs[k]['combined_trends_mean_change']
                      }
                    />
                  </li>
                </>
              );
            })}
          </ul>
        </section>
        {/* <hr className="mt-10 border-[#555]" /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
