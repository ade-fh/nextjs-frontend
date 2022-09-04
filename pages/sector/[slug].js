import dynamic from "next/dynamic";
import { useRouter } from 'next/router'
import Head from "next/head";
import Image from "next/image";
import DetailCard from "../../components/DetailCard";
// import BarCharts from '../components/BarCharts';
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import trendsData from "../../data/Data_GT.json";

const BarCharts = dynamic(() => import("../../components/BarCharts"), {
  ssr: false,
});
const LineCharts = dynamic(() => import("../../components/LineCharts"), {
  ssr: false,
});

export default function Sector() {
  const router = useRouter()
  const slug = router.query.slug
  var selectedTrendsData = slug && trendsData[slug]

  const positiveBrandTrendSorted = selectedTrendsData && Object.keys(
    selectedTrendsData["brand_data"]
  )
    .filter((brand) => trendsData[slug]["brand_data"][brand] > 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[slug]["brand_data"][a] -
          trendsData[slug]["brand_data"][b]
        )
    );

  const positiveBrandTrendSortedData = positiveBrandTrendSorted?.map(
    (brand) => trendsData[slug]["brand_data"][brand]
  );

  const negativeBrandTrendSorted = selectedTrendsData && Object.keys(
    selectedTrendsData["brand_data"]
  )
    .filter((brand) => trendsData[slug]["brand_data"][brand] < 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[slug]["brand_data"][a] -
          trendsData[slug]["brand_data"][b]
        )
    );

  const negativeBrandTrendSortedData = negativeBrandTrendSorted?.map(
    (brand) => trendsData[slug]["brand_data"][brand]
  );

  const positiveWordTrendSorted = selectedTrendsData && Object.keys(
    selectedTrendsData["word_data"]
  )
    .filter((word) => trendsData[slug]["word_data"][word] > 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[slug]["word_data"][a] -
          trendsData[slug]["word_data"][b]
        )
    );

  const positiveWordTrendSortedData = positiveWordTrendSorted?.map(
    (word) => trendsData[slug]["word_data"][word]
  );

  const negativeWordTrendSorted = selectedTrendsData && Object.keys(
    selectedTrendsData["word_data"]
  )
    .filter((word) => trendsData[slug]["word_data"][word] < 0.0)
    .sort(
      (a, b) =>
        -(
          trendsData[slug]["word_data"][a] -
          trendsData[slug]["word_data"][b]
        )
    );

  const negativeWordTrendSortedData = negativeWordTrendSorted?.map(
    (word) => trendsData[slug]["word_data"][word]
  );

  return (
    // <div>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <h1>Hello World</h1>
    // </div>
    <div className="min-h-screen flex items-center bg-[#222]">
      <div className="flex-1 max-w-7xl mx-auto p-10">
        <section>
          <h1 className="text-white text-[2rem] font-bold">{trendsData[slug]?.name}</h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
          </p>
        </section>
        <section>
          <h1 className="text-white text-[2rem] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
          </p>
          <LineCharts
            trendsData2021={selectedTrendsData && Object.values(
              selectedTrendsData["biannually_brand_trends_mean"]["2021"]
            )}
            trendsData2022={selectedTrendsData && Object.values(
              selectedTrendsData["biannually_brand_trends_mean"]["2022"]
            )}
          />
        </section>
        <section className="columns-2">
          <div className="flex flex-col items-center justify-center border border-solid border-white p-8">
            <p className="text-white text-[1.1rem]">
                Brand searches are up by
            </p>
            <h2 className="text-white text-[2rem] font-bold">
                {selectedTrendsData && selectedTrendsData["brand_trends_mean_change"].toFixed(1)}%
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center border border-solid border-white p-8">
            <p className="text-white text-[1.1rem]">
                Generic searches are up by
            </p>
            <h2 className="text-white text-[2rem] font-bold">
                {selectedTrendsData && selectedTrendsData["word_trends_mean_change"].toFixed(1)}%
            </h2>
          </div>
        </section>
        <section>
          <h1 className="text-white text-[2rem] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
          </p>
          <BarCharts
            sector={positiveBrandTrendSorted}
            series={positiveBrandTrendSortedData}
            fillColor="#07818F"
          />
        </section>
        <section>
          <h1 className="text-white text-[2rem] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
            <BarCharts
              sector={negativeBrandTrendSorted}
              series={negativeBrandTrendSortedData}
              fillColor="#DA127D"
            />
          </p>
        </section>
        <section>
          <h1 className="text-white text-[2rem] font-bold">Generic Words</h1>
          <h1 className="text-white text-[2rem] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
          </p>
          <BarCharts
            sector={positiveWordTrendSorted}
            series={positiveWordTrendSortedData}
            fillColor="#07818F"
          />
        </section>
        <section>
          <h1 className="text-white text-[2rem] font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-white text-[1.1rem]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, ullam
            officia optio numquam voluptatibus tenetur similique eveniet
            repudiandae voluptate eum autem atque nesciunt, aspernatur fugiat
            dolore, magni explicabo beatae. Aperiam.
            <BarCharts
              sector={negativeWordTrendSorted}
              series={negativeWordTrendSortedData}
              fillColor="#DA127D"
            />
          </p>
        </section>
        <hr className="mt-10 border-[#555]" />
        <Footer />
      </div>
    </div>
  );
}
