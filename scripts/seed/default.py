#!/usr/bin/env python
import sys
from random import SystemRandom

def create_seed():
    alphabet = u'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    generator = SystemRandom()
    seed = u''.join(generator.choice(alphabet) for _ in range(81))
    return seed

def main():
    seed = create_seed()
    sys.stdout.write(seed)

if __name__ == '__main__':
    main()
