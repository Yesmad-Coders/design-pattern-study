import { getLeftTime } from "../../utils/time.js";

const getItemTemplate = (message, endTime) => `
        <div class="message-item-time-wrapper">
            <div class="message-item-message"> 메 세 지 :${message} </div>
            <div class="message-item-time"> 남은 시간 : ${getLeftTime(
              endTime
            )} </div>
        </div>
        <div class="message-item-button-wrapper">
            <select class="message-item-select">
                <option value="3">3초</option>
                <option value="5">5초</option>
                <option value="x2">2배</option>
                <option value="x3">3배</option>
            </select>
            <button class="message-item-button increase">시간추가</button>
        </div>
        <div class="message-item-button-wrapper">
            <select class="message-item-select">
                <option value="3">3초</option>
                <option value="5">5초</option>
            </select>
            <button class="message-item-button decrease">시간감소</button>
        </div>
        <div class="message-item-button-wrapper">
            <button class="message-item-button delete">삭제</button>
        </div>
`;

export default getItemTemplate;
