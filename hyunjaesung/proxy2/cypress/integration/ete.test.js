describe("Page Init Test", () => {
  it("타이틀 테스트", () => {
    cy.visit("/").title().should("eq", "PungPungMessage");
  });
});

describe("MessageInput Component Test", () => {
  it("메시지 추가", () => {
    cy.get("#message-input")
      .type("5초 추가 테스트")
      .get("#message-input-select")
      .select("5초")
      .get("#message-input-button")
      .click();
  });
});

describe("MessageList Component Test", () => {
  const deleteAll = () =>
    cy
      .get(".message-item-button-wrapper > .delete", { timeout: 0 })
      .each(($button) => {
        cy.wrap($button).click();
      });

  const add10SecItem = () =>
    cy
      .get("#message-input")
      .type("10초 추가 테스트")
      .get("#message-input-select")
      .select("10초")
      .get("#message-input-button")
      .click();

  it("메시지 시간 세팅 테스트", () => {
    cy.get(".message-item-time", { timeout: 0 })
      .should("have.text", " 남은 시간 : 5 ")
      .wait(1000)
      .should("have.text", " 남은 시간 : 4 ");
  });

  it("메시지 세팅 테스트", () => {
    cy.get(".message-item-message", { timeout: 0 }).should(
      "have.text",
      " 메 세 지 :5초 추가 테스트 "
    );
  });

  it("시간 경과 후 메시지 자동 삭제 테스트", () => {
    cy.wait(4000);
    cy.get("#message-list", { timeout: 0 }).children().should("have.length", 0);
  });

  it("복수의 메시지 추가 시 오름차순 정렬 테스트", () => {
    cy.get("#message-input")
      .type("5초 추가 테스트")
      .get("#message-input-select")
      .select("5초")
      .get("#message-input-button")
      .click();

    cy.get("#message-input")
      .type("30초 추가 테스트")
      .get("#message-input-select")
      .select("30초")
      .get("#message-input-button")
      .click();

    cy.get(".message-item-message", { timeout: 0 })
      .eq(0)
      .should("have.text", " 메 세 지 :30초 추가 테스트 ");

    cy.get("#message-input")
      .type("10초 추가 테스트")
      .get("#message-input-select")
      .select("10초")
      .get("#message-input-button")
      .click();

    cy.get(".message-item-message", { timeout: 0 })
      .eq(1)
      .should("have.text", " 메 세 지 :10초 추가 테스트 ");
  });

  it("삭제 버튼 테스트", () => {
    deleteAll();
    cy.get("#message-list", { timeout: 0 }).children().should("have.length", 0);
  });

  it("시간 추가 버튼 테스트", () => {
    add10SecItem();

    cy.get(".message-item-select", { timeout: 0 })
      .first()
      .select("3배")
      .get(".message-item-time", { timeout: 0 })
      .then(($div) => {
        if ($div) {
          const leftTime = parseInt(
            $div[0].innerText.replace("남은 시간 : ", "")
          );
          cy.get(".increase", { timeout: 0 }).click();
          cy.get(".message-item-time", { timeout: 0 }).then(($div) => {
            if ($div) {
              const leftTime2 = parseInt(
                $div[0].innerText.replace("남은 시간 : ", "")
              );
              expect(leftTime * 3).to.be.equal(leftTime2);
            }
          });
        }
      });
  });

  it("시간 추가시 오름차순 재정렬 테스트", () => {
    cy.wait(2000);
    add10SecItem();

    cy.get(".message-item-select", { timeout: 0 })
      .eq(2)
      .select("3배")
      .get(".message-item-time", { timeout: 0 })
      .last()
      .then(($div) => {
        if ($div) {
          const leftTime = parseInt(
            $div[0].innerText.replace("남은 시간 : ", "")
          );
          cy.get(".increase", { timeout: 0 }).last().click();
          cy.get(".message-item-time", { timeout: 0 })
            .first()
            .then(($div) => {
              if ($div) {
                const leftTime2 = parseInt(
                  $div[0].innerText.replace("남은 시간 : ", "")
                );
                expect(leftTime * 3).to.be.equal(leftTime2);
              }
            });
        }
      });
  });

  it("시간 감소 버튼 테스트", () => {
    deleteAll();
    add10SecItem();

    cy.get(".message-item-select", { timeout: 0 })
      .eq(1)
      .select("5초")
      .get(".message-item-time", { timeout: 0 })
      .then(($div) => {
        if ($div) {
          const leftTime = parseInt(
            $div[0].innerText.replace("남은 시간 : ", "")
          );
          cy.get(".decrease", { timeout: 0 }).click();
          cy.get(".message-item-time", { timeout: 0 })
            .first()
            .then(($div) => {
              if ($div) {
                const leftTime2 = parseInt(
                  $div[0].innerText.replace("남은 시간 : ", "")
                );
                expect(leftTime - 5).to.be.equal(leftTime2);
              }
            });
        }
      });
  });
});
