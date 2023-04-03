import React, { useState } from "react";
import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("as");
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-jua font-extrabold text-[#222328] text-[32px]">
          등록된 작품들
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          DALL-E AI에 의해 생성된 놀라운 컬렉션을 살펴보세요!
        </p>
      </div>

      <div className="mt-16">
        <FormField />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                검색된 다음에 대한 결과 표시{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title={"검색된 결과가 없습니다."} />
              ) : (
                <RenderCards data={[]} title={"검색된 게시글이 없습니다."} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
