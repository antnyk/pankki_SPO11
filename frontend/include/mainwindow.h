#pragma once

#include <QMainWindow>

#include <REST/rest.h>
#include <CardReader/cardreader.h>

#include "login.h"
#include "menu.h"
#include "transactions.h"
#include "balance.h"
#include "withdraw.h"
#include "status.h"

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

// Using a normal enum because this is intended to be compared
// with the int the QStackedWidget::currentChanged emits.
namespace StackedWidgetChildren {
    enum {
        LOGIN = 0,
        MENU,
        BALANCE,
        TRANSACTIONS,
        WITHDRAW,
        STATUS
    };
}

class MainWindow final : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    void show_status(QWidget *, const QString&, bool = true, const QString& = "");

    void show_menu();
    void show_widget(QWidget *);

    Ui::MainWindow *ui() { return m_ui; }
    QString& token() { return m_token; }

    Login *login_widget() { return m_login_widget; }

    bool is_debit() { return m_is_debit; }

private:
    Ui::MainWindow *m_ui;

    QString m_token;

    Login* m_login_widget;
    Menu* m_menu_widget;
    Transactions* m_transactions_widget;
    Balance* m_balance_widget;
    Withdraw* m_withdraw_widget;
    Status* m_status_widget;
    bool m_is_debit;
};
