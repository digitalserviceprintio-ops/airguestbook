import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { Guest, Transaction, WishlistItem, GuestWish, UserAccount } from '../types';
import { INITIAL_GUESTS, INITIAL_TRANSACTIONS, INITIAL_WISHLIST, INITIAL_WISHES } from '../data';

// --- SEEDING LOGIC IF FIRESTORE IS EMPTY ---
let isSeeding = false;

export async function seedInitialDataIfEmpty() {
  if (isSeeding) return;
  isSeeding = true;
  try {
    const guestsSnap = await getDocs(collection(db, 'guests')).catch((err) => {
      handleFirestoreError(err, OperationType.LIST, 'guests');
      return null;
    });

    if (guestsSnap && guestsSnap.empty) {
      console.log('Seeding initial guests into Firestore...');
      const batch = writeBatch(db);
      for (const guest of INITIAL_GUESTS) {
        batch.set(doc(db, 'guests', guest.id), guest);
      }
      for (const tx of INITIAL_TRANSACTIONS) {
        batch.set(doc(db, 'transactions', tx.id), tx);
      }
      for (const item of INITIAL_WISHLIST) {
        batch.set(doc(db, 'wishlist', item.id), item);
      }
      for (const wish of INITIAL_WISHES) {
        batch.set(doc(db, 'wishes', wish.id), wish);
      }
      await batch.commit().catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, 'batch_seed');
      });
      console.log('Firestore successfully populated with initial wedding event data.');
    }
  } catch (error) {
    console.warn('Seeding notice:', error);
  } finally {
    isSeeding = false;
  }
}

// --- SUBSCRIBERS (REAL-TIME SNAPSHOTS) ---

export function subscribeGuests(onData: (guests: Guest[]) => void) {
  const path = 'guests';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        seedInitialDataIfEmpty();
        onData(INITIAL_GUESTS);
        return;
      }
      const data: Guest[] = [];
      snapshot.forEach((d) => {
        data.push(d.data() as Guest);
      });
      onData(data);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeTransactions(onData: (txs: Transaction[]) => void) {
  const path = 'transactions';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_TRANSACTIONS);
        return;
      }
      const data: Transaction[] = [];
      snapshot.forEach((d) => {
        data.push(d.data() as Transaction);
      });
      onData(data);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeWishlist(onData: (items: WishlistItem[]) => void) {
  const path = 'wishlist';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_WISHLIST);
        return;
      }
      const data: WishlistItem[] = [];
      snapshot.forEach((d) => {
        data.push(d.data() as WishlistItem);
      });
      onData(data);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export function subscribeWishes(onData: (wishes: GuestWish[]) => void) {
  const path = 'wishes';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        onData(INITIAL_WISHES);
        return;
      }
      const data: GuestWish[] = [];
      snapshot.forEach((d) => {
        data.push(d.data() as GuestWish);
      });
      onData(data);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

// --- MUTATIONS ---

export async function addGuestDoc(guest: Guest) {
  const path = `guests/${guest.id}`;
  try {
    await setDoc(doc(db, 'guests', guest.id), guest);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateGuestDoc(guestId: string, partial: Partial<Guest>) {
  const path = `guests/${guestId}`;
  try {
    await updateDoc(doc(db, 'guests', guestId), partial);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function addTransactionDoc(tx: Transaction) {
  const path = `transactions/${tx.id}`;
  try {
    await setDoc(doc(db, 'transactions', tx.id), tx);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function addWishlistDoc(item: WishlistItem) {
  const path = `wishlist/${item.id}`;
  try {
    await setDoc(doc(db, 'wishlist', item.id), item);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function addWishDoc(wish: GuestWish) {
  const path = `wishes/${wish.id}`;
  try {
    await setDoc(doc(db, 'wishes', wish.id), wish);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function likeWishDoc(wishId: string, currentLikes: number) {
  const path = `wishes/${wishId}`;
  try {
    await updateDoc(doc(db, 'wishes', wishId), {
      likes: currentLikes + 1,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function syncUserProfile(user: UserAccount) {
  const path = `users/${user.id}`;
  try {
    await setDoc(doc(db, 'users', user.id), {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      eventName: user.eventName,
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
