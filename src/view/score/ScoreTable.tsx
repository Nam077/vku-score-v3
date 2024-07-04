import React, { useMemo, useState, useCallback } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    TableSortLabel,
    Autocomplete,
    TableCell,
    Chip,
    Box, TextField, Card, CardHeader, CardContent,
} from '@mui/material';
import { IScore, ScoreCh } from '@/common/interfaces/score';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import DebouncedInput from '@/view/component/DebouncedInput';

interface ScoreTableProps {
    scores: IScore[];
}

const TableRowStyled = styled(TableRow)`
  padding: 0.5rem;
  text-align: center;
`;
const TableCellHeader = styled(TableCell)`
  font-weight: bold;
`;

const TableCellStyled = styled(TableCell)`
`;

const getColor = (scoreCh: ScoreCh | null, scoreChChange: ScoreCh | null) => {
    if (scoreCh !== scoreChChange && scoreChChange !== null) {
        return '#82ffb4';
    }
    return '';
};

const getChipColor = (scoreCh: ScoreCh | null) => {
    switch (scoreCh) {
        case 'A':
            return 'success';
        case 'B':
            return 'primary';
        case 'C':
            return 'warning';
        case 'D':
            return 'secondary';
        case 'F':
            return 'error';
        default:
            return 'default';
    }
};

const scoreOptionsMap: { [key in Exclude<ScoreCh, null>]: ScoreCh[] } = {
    'F': ['A', 'B', 'C', 'D', 'F'],
    'D': ['A', 'B', 'C', 'D'],
    'C': ['A', 'B', 'C'],
    'B': ['A', 'B'],
    'A': ['A'],
};

const columnHelper = createColumnHelper<IScore>();

const ScoreTable: React.FC<ScoreTableProps> = ({ scores }) => {
    const [scoreState, setScoreState] = useState<IScore[]>(scores);
    const [searchQuery, setSearchQuery] = useState('');

    const handleScoreChange = useCallback((row: IScore, newValue: ScoreCh) => {
        setScoreState((prevScores) =>
            prevScores.map((score) =>
                score.id === row.id
                    ? {
                        ...score,
                        scoreChChange: newValue === row.scoreCh ? null : newValue,
                    }
                    : score,
            ),
        );
    }, []);

    const sortedScores = useMemo(() => {
        if (!searchQuery) {
            return scoreState;
        }

        const fieldsToCheck: (keyof IScore)[] = ['name', 'countTC', 'countLH', 'scoreCC', 'scoreBT', 'scoreGK', 'scoreCK', 'scoreT10', 'scoreCh'];
        return [...scoreState].sort((a, b) => {
            const aMatches = fieldsToCheck.some(field => a[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase()));
            const bMatches = fieldsToCheck.some(field => b[field]?.toString().toLowerCase().includes(searchQuery.toLowerCase()));

            if (aMatches && !bMatches) return -1;
            if (!aMatches && bMatches) return 1;
            return 0;
        });
    }, [scoreState, searchQuery]);

    const columns = useMemo<ColumnDef<IScore, any>[]>(
        () => [
            columnHelper.accessor('id', {
                header: 'ID',
                cell: (info) => (
                    <Typography sx={{ fontWeight: 'bold' }} variant='body1'>
                        {info.row.original.id}
                    </Typography>
                ),

            }),
            columnHelper.accessor('name', {
                header: 'Tên học phần',
                cell: (info) => (
                    <Typography sx={{ fontWeight: 'bold' }} variant='body1'>
                        {info.row.original.name}
                    </Typography>
                ),
            }),
            columnHelper.accessor('countTC', {
                header: 'Số tín chỉ',
            }),
            columnHelper.accessor('countLH', {
                header: 'Số lần học',
            }),
            columnHelper.accessor('scoreCC', {
                header: 'Điểm chuyên cần',
            }),
            columnHelper.accessor('scoreBT', {
                header: 'Điểm bài tập',
            }),
            columnHelper.accessor('scoreGK', {
                header: 'Điểm giữa kỳ',
            }),
            columnHelper.accessor('scoreCK', {
                header: 'Điểm cuối kỳ',
            }),
            columnHelper.accessor('scoreT10', {
                header: 'Điểm hệ 10',
            }),
            columnHelper.accessor('value', {
                header: 'Điểm chữ',
                cell: (info) => (
                    <Chip
                        color={getChipColor(info.row.original.scoreCh || 'F')}
                        sx={{ fontWeight: 'bold' }}
                        label={info.row.original.scoreCh || 'F'}
                    />
                ),
            }),
            columnHelper.accessor('scoreChChange', {
                header: 'Thay đổi',
                cell: (info) => (
                    <Autocomplete
                        disableClearable
                        renderInput={(params) => (
                            <TextField {...params} label='Điểm chữ' variant='outlined' />
                        )}
                        options={scoreOptionsMap[info.row.original.scoreCh || 'F']}
                        value={info.row.original.scoreChChange || info.row.original.scoreCh || ''}
                        onChange={(event, newValue) => handleScoreChange(info.row.original, newValue as ScoreCh)}
                    />
                ),
            }),
        ],
        [handleScoreChange],
    );

    const table = useReactTable({
        data: sortedScores,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 100,
            },
        },
    });

    return (
        <Card>
            <CardHeader title={'Bảng Điểm'} />
            <CardContent>
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <DebouncedInput
                            fullWidth
                            label='Search'
                            variant='outlined'
                            value={searchQuery}
                            onChange={value => setSearchQuery(value as string)}
                            debounce={500}
                        />
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableCellHeader key={header.id}>
                                                <TableSortLabel
                                                    active={header.column.getIsSorted() !== false}
                                                    direction={header.column.getIsSorted() ? 'desc' : 'asc'}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                </TableSortLabel>
                                            </TableCellHeader>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRowStyled key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCellStyled
                                                key={cell.id}
                                                style={{ backgroundColor: getColor(cell.row.original.scoreCh || null, cell.row.original.scoreChChange || null) }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCellStyled>
                                        ))}
                                    </TableRowStyled>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component='div'
                            rowsPerPageOptions={[10, 25, 50, 100]}
                            count={sortedScores.length}
                            rowsPerPage={table.getState().pagination.pageSize}
                            page={table.getState().pagination.pageIndex}
                            onPageChange={(event, newPage) => table.setPageIndex(newPage)}
                            onRowsPerPageChange={(event) =>
                                table.setPageSize(Number(event.target.value))
                            }
                        />
                    </TableContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ScoreTable;
