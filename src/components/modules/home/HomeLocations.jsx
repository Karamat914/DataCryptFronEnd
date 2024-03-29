import ButtonUI from "@/components/common/ButtonUI";
import InputUI from "@/components/common/InputUI";
import Image from "next/image";
import React from "react";

const HomeLocations = () => {
  return (
    <>
      <div className="container py-16">
        <div className="flex gap-2">
          <InputUI placeholder="Search Locations..." size="sm" />
          <ButtonUI isIconOnly variant="flat" size="lg">
            <Image src="/images/sendIcon.svg" height={24} width={24} />
          </ButtonUI>
        </div>
      </div>
    </>
  );
};

export default HomeLocations;
