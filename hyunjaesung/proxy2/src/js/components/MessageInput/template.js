const getInputTemplate = () => `<form id="message-input-form">
                                    <label for="message-input">메세지</label>
                                    <input type="text" id="message-input" required minlength="3" maxlength="20"></input>
                                    <label for="message-input-select">시간</label>
                                    <select id="message-input-select">
                                        <option value="3">3초</option>
                                        <option value="5">5초</option>
                                        <option value="10">10초</option>
                                        <option value="30">30초</option>
                                        <option value="60">1분</option>
                                    </select>
                                    <button id="message-input-button">추가</button>
                                </form>`;

export default getInputTemplate;
