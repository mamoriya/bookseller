function getSession() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));


    return { token, cbid };
}
//eslint-disable-line

export async function getUser() {

    const sessionData = getSession();

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData.token}`
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${sessionData.cbid}`, requestOptions);

    if (!response.ok) {
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders() {
    const sessionData = getSession();

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${sessionData.cbid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.token}` }
    });
    if (!response.ok) {
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data;
}

export async function createOrder(user, total, cartList) {

    const sessionData = getSession();

    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${sessionData.token}` },
            body: JSON.stringify(order)
        }
    );
    if (!response.ok) {
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data
}