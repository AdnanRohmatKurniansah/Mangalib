import { Skeleton } from "@chakra-ui/react";
import React from "react"

interface Props {
  skeletonArray: number[];
}

const ManhwaLoader: React.FC<Props> = ({ skeletonArray }) => {
  return (
    <div className="manhwa-list border p-4 mt-14 border-gray-100 bg-white rounded-md">
    <h1 className="text-xl font-bold mb-4">Suka baca manhwa?</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skeletonArray.map((i) => (
          <Skeleton className="min-h-[240px] rounded-md" key={i} />
        ))}
    </div>
  </div>
  )
}

export default ManhwaLoader