import { FullHeightContainer } from "@/components/utils/full-height-container";

export function Research() {
  return (
    <FullHeightContainer>
      <div className="flex flex-col">
        <div className="flex flex-grow">
          <div>Age</div>
          <div>Fame rating</div>
        </div>
        <div className="flex flex-grow">
          <div>Location</div>
          <div>Interests tags</div>
        </div>
      </div>
    </FullHeightContainer>
  );
}
