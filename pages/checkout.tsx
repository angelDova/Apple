import Head from "next/head";
import Header from "../components/Header";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
// import Stripe from "stripe";
import Button from "../components/Button";
// import CheckoutProduct from "../components/CheckoutProduct";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
// import CheckoutProduct from "../components/CheckoutProduct";
// import { fetchPostJSON } from "../utils/api-helpers";
// import getStripe from "../utils/get-stripejs";

function Checkout() {
  const items = useSelector(selectBasketItems);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  ); // w/out key value pair it will give us an error

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]); // empty dependency, which means anything we write inside the useEffect runs on mount

  // Every time items change, the useEffect will recalculate and give us a fresh groupedItems

  return (
    <div>
      <Head>
        <title>Bag - Apple</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="">
          <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your bag." : "Your bag is empty."}
          </h1>
          <p className="my-4">Free delivery and return</p>

          {items.length === 0 && (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          )}
        </div>

        {/* This piece of code groups items in the shopping bag together  */}

        {items.length > 0 && (
          <div className="">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
