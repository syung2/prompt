// mongoose 라이브러리에서 Schema, model, models를 임포트합니다.
import mongoose, { Schema, model, models } from "mongoose";

// Prompt 스키마를 정의합니다.
const PromptSchema = new Schema({
  // creator 필드는 ObjectId 타입이며, "User" 모델과의 관계를 나타냅니다.
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // "User" 모델과의 관계를 설정합니다.
  },
  // prompt 필드는 문자열 타입이며, 필수로 지정되어 있습니다. 프롬프트 텍스트를 저장합니다.
  prompt: {
    type: String,
    required: [true, "prompt is required"], // 필수 입력 필드입니다.
  },
  // tag 필드는 문자열 타입이며, 필수로 지정되어 있습니다. 프롬프트의 태그를 저장합니다.
  tag: {
    type: String,
    required: [true, "Tag is required"], // 필수 입력 필드입니다.
  },
});

// 이미 생성된 Prompt 모델이 있으면 사용하고, 없으면 새로운 모델을 생성합니다.
const Prompt = models.Prompt || model("Prompt", PromptSchema);

// Prompt 모델을 내보냅니다.
export default Prompt;
