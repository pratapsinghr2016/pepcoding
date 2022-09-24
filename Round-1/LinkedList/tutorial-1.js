function Node(value) {
  this.value = value;
  this.next = null;
}
/* 
*************************** WRONG ****************************


function detectLinkedList(headA, headB) {
  function detectCycle(pointerA, pointerB) {
    const slow = pointerA;
    const fast = pointerB;

    while (slow != fast) {
      slow = slow.next;
      fast = fast.next.next;
    }

    slow = pointerA;

    while (slow != fast) {
      slow = slow.next;
      fast = fast.next;
    }

    if (slow != fast) {
      return null;
    }

    return slow;
  }

  function helper(listA, listB) {
    let pointerA = listA;

    while (!pointerA) {
      pointerA = pointerA.next;
    }

    pointerA.next = listB;

    detectCycle(listA, listB); // mistake

    pointerA.next = null;
  }
  helper(headA, headB);
} */

// ==================

function detectLinkedList2(headA, headB) {
  function getCycle(linkedList) {
    if (!linkedList || !linkedList.next) {
      return null;
    }

    const slow = linkedList;
    const fast = linkedList;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) {
        break;
      }
    }

    if (slow !== fast) {
      return null;
    }

    slow = linkedList;

    while (slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return slow;
  }

  function helper(listA, listB) {
    if (!listA || !listB) {
      return null;
    }

    const pointerA = listA;

    while (!pointerA.next) {
      pointerA = pointerA.next;
    }

    pointerA.next = listB;
    const response = getCycle(listA);
    pointerA.next = null;
    return response;
  }
  return helper(headA, headB);
}

function getIntersectNode(headA, headB) {
  let pointerA = headA;
  let pointerB = headB;

  while (pointerA !== pointerB) {
    pointerA = pointerA == null ? headB : pointerA.next;
    pointerB = pointerB == null ? headA : pointerB.next;
  }
  return pointerA;
}
