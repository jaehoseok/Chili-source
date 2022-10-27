package com.ssafy.service;

import com.ssafy.repository.WiggetRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WIggetServiceImpl implements WiggetService {
    private final WiggetRepo wiggetRepo;
}
